import {REGEX_SCHEMA_FILE} from '../../config/constants';
import {FileInfo} from '../../entities/fs/FileInfo';
import {readDir} from '../infrastructure/fs/readDir';

export function loadSchemaFileTree(schemaDir: string): Promise<FileInfo> {
    return readDir(schemaDir)
        .then((fileInfo: FileInfo) => {
            return fileInfo.filterFiles(REGEX_SCHEMA_FILE).filterEmptyDirs();
        });
}
