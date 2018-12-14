import {inject, injectable} from 'inversify';
import * as path from 'path';
import {FileInfo} from '../context/fs/FileInfo';
import {FilesystemId, FilesystemInterface} from '../context/fs/FilesystemInterface';
import {JsonSchemaValidator} from '../context/schema/JsonSchemaValidator';
import {SchemaConfig} from '../context/schema/SchemaConfig';
import {jsonBasename} from '../helpers/jsonBasename';
import {dirname, getAbsolutePath, joinPath, relativePath} from '../helpers/value/path';
import {SchemaDir} from '../states/objects/fileTree/SchemaDir';
import {SchemaFile} from '../states/objects/fileTree/SchemaFile';
import {SchemaFileVariant} from '../states/objects/fileTree/SchemaFileVariant';
import {SchemaTree} from '../states/objects/fileTree/SchemaTree';
import {SchemaTreeItem} from '../states/objects/fileTree/SchemaTreeItem';

type FileToVariantIds = Map<string, string[]>;

@injectable()
export class SchemaRepo {

    constructor(
        @inject(FilesystemId) private filesystem: FilesystemInterface,
        private jsonSchemaValidator: JsonSchemaValidator,
    ) {
    }

    public load(file: string, schemaFolder: string): Promise<SchemaConfig> {
        return this.filesystem.readJson<SchemaConfig>(file)
            .then((schema: SchemaConfig) => this.jsonSchemaValidator.validateSchema(schema, path.basename(file)))
            .then((schema: SchemaConfig) => this.resolveSchema(schema, file, schemaFolder));
    }

    public loadFileTree(schemaDir: string, dataDir: string, variantDir: string): Promise<SchemaTree> {
        return Promise.all<FileInfo, FileToVariantIds>([
            this.fetchFileTree(schemaDir),
            this.fetchFileVariantIds(variantDir),
        ]).then(([schemaTree, fileVariantIds]) => {
            const root: SchemaDir = schemaTree.map<SchemaTreeItem>((file: FileInfo, children): SchemaTreeItem => {
                return this.createTreeObj(file, children, fileVariantIds, schemaDir, dataDir, variantDir);
            }) as SchemaDir;

            return new SchemaTree(root.children);
        });
    }

    public resolveSchema(schema: SchemaConfig, currentFile: string, schemaFolder: string): Promise<SchemaConfig> {
        return new Promise((resolve, reject) => {
            if (!schema.schema) {
                reject(`schema must contain a schema property in ${currentFile}`);
                return;
            }

            resolve(this.mapData(schema.schema, {}, currentFile, schemaFolder));
        });
    }


    private fetchFileTree(schemaDir: string): Promise<FileInfo> {
        return this.filesystem.readDir(schemaDir)
            .then((fileInfo: FileInfo | null) => {
                if (fileInfo == null) {
                    throw new Error(`schema directory ${schemaDir} doesn't exist.`);
                }
                return fileInfo.filterFiles(/\.schema\.json$/).filterEmptyDirs();
            });
    }

    private fetchFileVariantIds(variantDir: string): Promise<FileToVariantIds> {
        return this.filesystem.readDir(variantDir)
            .then((fileInfo: FileInfo | null): FileInfo[] => {
                if (fileInfo == null) {
                    return [];
                }
                return fileInfo.filterFiles(/\.json$/).filterEmptyDirs().children;
            })
            .then((variantDirs: FileInfo[]) => {
                let map: FileToVariantIds = new Map();

                variantDirs.forEach((variantDir: FileInfo) => {
                    const variantId: string = variantDir.filename;

                    this.getVariantFiles(variantDir).forEach((filename: string) => {
                        let variantIds: string[] = map.has(filename) ? map.get(filename) as string[] : [];
                        map.set(filename, [...variantIds, variantId]);
                    });
                });

                return map;
            });
    }

    private getVariantFiles(variantDir: FileInfo): string[] {
        return variantDir.getAllFiles().map((file: FileInfo) => {
            return jsonBasename(relativePath(variantDir.path, file.path));
        });
    }

    private createTreeObj(
        file: FileInfo,
        children: SchemaTreeItem[],
        fileVariantIds: FileToVariantIds,
        schemaDir: string,
        dataDir: string,
        variantDir: string,
    ): SchemaTreeItem {
        const basename: string = jsonBasename(relativePath(schemaDir, file.path));

        if (file.isDir) {
            return new SchemaDir(file.filename, basename, children);
        }

        let variants: SchemaFileVariant[] = [];

        let variantIds: string[] = fileVariantIds.get(basename) || [];
        for (const variantId of variantIds) {
            const variantFile: string = joinPath(variantDir, variantId, `${basename}.json`);
            variants.push(new SchemaFileVariant(variantId, variantId, variantFile));
        }

        const dataFile: string = this.schemaFileToDataFile(file.path, schemaDir, dataDir);

        return new SchemaFile(
            this.getSchemaName(file),
            basename,
            file.path,
            dataFile,
            variants,
        );
    }

    private schemaFileToDataFile(schemaFile: string, schemaDir: string, dataDir: string): string {
        let path: string = relativePath(schemaDir, schemaFile);
        path             = joinPath(dataDir, jsonBasename(path));

        return `${path}.json`;
    }

    private getSchemaName(file: FileInfo): string {
        try {
            const data: any = this.filesystem.readJsonSync(file.path);
            return data.title || jsonBasename(file.filename);
        } catch (error) {
            console.error(`Failed to read schema file "${file.path}": ${error}`);
            return jsonBasename(file.filename);
        }
    }

    private mapData(schema: any, uiSchema: any, currentFile: string, schemaFolder: string): SchemaConfig {
        let refFile: string = '';
        if (schema.$ref && schema.$ref.indexOf('#') !== 0) {
            refFile = getAbsolutePath(schema.$ref, schemaFolder, dirname(currentFile));

            const refData: any = this.filesystem.readJsonSync(refFile);

            schema = {...refData, ...schema};
            delete schema.$ref;
        }

        if (schema.type == 'object') {
            if (!schema.properties) {
                throw new Error('type object has no "properties" definition in ' + currentFile);
            }

            Object.keys(schema.properties).forEach((prop: string) => {
                let mapped: SchemaConfig = this.mapData(schema.properties[prop], {}, refFile || currentFile, schemaFolder);
                schema.properties[prop]  = mapped.schema;
                uiSchema[prop]           = mapped.uiSchema;
            });
        } else if (schema.type == 'array') {
            if (!schema.items) {
                throw new Error('type array has no "items" definition in ' + currentFile);
            }

            let mapped: SchemaConfig = this.mapData(schema.items, {}, refFile || currentFile, schemaFolder);
            schema.items             = mapped.schema;
            uiSchema.items           = mapped.uiSchema;
        }

        schema = this.resolveAutocomplete(schema, currentFile, schemaFolder);

        Object.keys(schema).forEach((key: string) => {
            if (key.indexOf('ui:') === 0) {
                uiSchema[key] = schema[key];
                delete schema[key];
            }
        });

        return {
            schema,
            uiSchema,
        };
    }

    private resolveAutocomplete(schema: any, currentFile: string, schemaFolder: string): any {
        const autocompleteConfig: any = schema['dj:autocomplete'];
        if (!autocompleteConfig) {
            return schema;
        }

        if (autocompleteConfig.$ref) {
            let refFile = getAbsolutePath(autocompleteConfig.$ref, schemaFolder, dirname(currentFile));
            schema['dj:autocomplete'] = this.filesystem.readJsonSync(refFile);
        }

        schema['ui:widget'] = 'AutocompleteWidget';

        return schema;
    }
}
