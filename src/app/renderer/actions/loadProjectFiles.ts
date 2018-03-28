import {FileInfo} from '../../../common/value/fileInfo';
import {joinPath, relativePath} from '../../../common/value/path';
import {schemaRepo} from '../../../domain/repositories/schemaRepo';
import {FileToVariantIds, variantRepo} from '../../../domain/repositories/variantRepo';
import {jsonFile} from '../../../infrastructure/jsonFile';
import {DataDir, DataFileType} from '../../../domain/entities/project/DataDir';
import {DataFile, FileVariant} from '../../../domain/entities/project/DataFile';
import {jsonBasename} from '../../../domain/helpers/jsonBasename';
import {schemaFileToDataFile} from '../../../domain/helpers/schemaFileToDataFile';
import {settingsStore} from '../stores/settingsStore';

export function loadProjectFiles(schemaDir: string, dataDir: string, variantDir: string): Promise<DataFileType[]> {
    return Promise.all<FileInfo, FileToVariantIds>([
        schemaRepo.loadFileTree(schemaDir),
        variantRepo.fetchFileVariantIds(variantDir),
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
        const data: any = jsonFile.readSync(file.path);
        return data.title || jsonBasename(file.filename);
    } catch (error) {
        console.error(`Failed to read schema file "${file.path}": ${error}`);
        return jsonBasename(file.filename);
    }
}
