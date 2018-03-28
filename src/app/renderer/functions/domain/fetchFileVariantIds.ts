import {relativePath} from '../../../../common/value/path';
import {filesystem} from '../../../../infrastructure/filesystem';
import {REGEX_JSON_FILE} from '../../config/constants';
import {FileInfo} from '../../../../common/value/fileInfo';
import {jsonBasename} from './jsonBasename';

export type FileToVariantIds = Map<string, string[]>;

export function fetchFileVariantIds(variantDir: string): Promise<FileToVariantIds> {
    return filesystem.readDir(variantDir)
        .then((fileInfo: FileInfo) => {
            return fileInfo.filterFiles(REGEX_JSON_FILE).filterEmptyDirs().children;
        })
        .then((variantDirs: FileInfo[]) => {
            let map: FileToVariantIds = new Map();

            variantDirs.forEach((variantDir: FileInfo) => {
                const variantId: string = variantDir.filename;

                getVariantFiles(variantDir).forEach((filename: string) => {
                    let variantIds: string[] = map.has(filename) ? map.get(filename) as string[] : [];
                    map.set(filename, [...variantIds, variantId]);
                });
            });

            return map;
        });
}

function getVariantFiles(variantDir: FileInfo): string[] {
    return variantDir.getAllFiles().map((file: FileInfo) => {
        return jsonBasename(relativePath(variantDir.path, file.path));
    });
}