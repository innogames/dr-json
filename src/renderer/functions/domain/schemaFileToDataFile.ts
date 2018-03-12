import {joinPath, relativePath} from '../../../shared/common/value/path';
import {jsonBasename} from './jsonBasename';

export function schemaFileToDataFile(schemaFile: string, schemaDir: string, dataDir: string): string {
    let path: string = relativePath(schemaDir, schemaFile);
    path             = joinPath(dataDir, jsonBasename(path));

    return `${path}.json`;
}