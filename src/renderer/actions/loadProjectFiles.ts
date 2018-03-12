import {joinPath, relativePath} from '../../shared/common/value/path';
import {FileInfo} from '../entities/fs/FileInfo';
import {DataDir, DataFileType} from '../entities/project/DataDir';
import {DataFile, FileVariant} from '../entities/project/DataFile';
import {fetchFileVariantIds, FileToVariantIds} from '../functions/domain/fetchFileVariantIds';
import {jsonBasename} from '../functions/domain/jsonBasename';
import {loadSchemaFileTree} from '../functions/domain/loadSchemaFileTree';
import {schemaFileToDataFile} from '../functions/domain/schemaFileToDataFile';
import {readJsonFileSync} from '../functions/infrastructure/fs/readJsonFile';
import {settingsStore} from '../stores/settingsStore';

export function loadProjectFiles(schemaDir: string, dataDir: string, variantDir: string): Promise<DataFileType[]> {
    return Promise.all<FileInfo, FileToVariantIds>([
        loadSchemaFileTree(schemaDir),
        fetchFileVariantIds(variantDir),
    ]).then(([schemaTree, fileVariantIds]) => {
        return (
            schemaTree.map<DataFileType>((file: FileInfo, children): DataFileType => {
                return createFileObj(file, children, fileVariantIds, schemaDir, dataDir, variantDir);
            }) as DataDir
        ).children;
    });
}

function createFileObj(
    file: FileInfo,
    children: DataFileType[],
    fileVariantIds: FileToVariantIds,
    schemaDir: string,
    dataDir: string,
    variantDir: string,
): DataFileType {
    const basename: string = jsonBasename(relativePath(schemaDir, file.path));

    if (file.isDir) {
        return new DataDir(
            file.filename,
            basename,
            children,
            settingsStore.collapsedDirs.indexOf(basename) >= 0,
        );
    }

    const dataFile: string = schemaFileToDataFile(file.path, schemaDir, dataDir);

    let variants: FileVariant[] = [new FileVariant(dataFile)];

    let variantIds: string[] = fileVariantIds.get(basename) || [];
    for (const variantId of variantIds) {
        const variantFile: string = joinPath(variantDir, variantId, `${basename}.json`);
        variants.push(new FileVariant(variantFile, variantId));
    }

    return new DataFile(
        getSchemaName(file),
        basename,
        file.path,
        variants,
    );
}

function getSchemaName(file: FileInfo): string {
    try {
        const data: any = readJsonFileSync(file.path);
        return data.title || jsonBasename(file.filename);
    } catch (error) {
        console.error(`Failed to read schema file "${file.path}": ${error}`);
        return jsonBasename(file.filename);
    }
}
