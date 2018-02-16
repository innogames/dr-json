import {joinPath, relativePath} from '@/functions/common/value/path';
import {jsonBasename} from '@/functions/domain/jsonBasename';

export function schemaFileToDataFile(schemaFile: string, schemaDir: string, dataDir: string): string {
    let path: string = relativePath(schemaDir, schemaFile);
    path             = joinPath(dataDir, jsonBasename(path));

    return `${path}.json`;
}