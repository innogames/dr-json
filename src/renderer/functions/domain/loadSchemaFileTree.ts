import {filesystem} from '../../../shared/infrastructure/filesystem';
import {REGEX_SCHEMA_FILE} from '../../config/constants';
import {FileInfo} from '../../../shared/common/value/fileInfo';

export function loadSchemaFileTree(schemaDir: string): Promise<FileInfo> {
    return filesystem.readDir(schemaDir)
        .then((fileInfo: FileInfo) => {
            return fileInfo.filterFiles(REGEX_SCHEMA_FILE).filterEmptyDirs();
        });
}
