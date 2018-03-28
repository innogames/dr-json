import {filesystem} from '../../../../infrastructure/filesystem';
import {REGEX_SCHEMA_FILE} from '../../config/constants';
import {FileInfo} from '../../../../common/value/fileInfo';

export function loadSchemaFileTree(schemaDir: string): Promise<FileInfo> {
    return filesystem.readDir(schemaDir)
        .then((fileInfo: FileInfo) => {
            return fileInfo.filterFiles(REGEX_SCHEMA_FILE).filterEmptyDirs();
        });
}
