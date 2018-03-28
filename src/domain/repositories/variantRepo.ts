import {jsonBasename} from '../helpers/jsonBasename';
import {FileInfo} from '../../common/value/fileInfo';
import {relativePath} from '../../common/value/path';
import {filesystem} from '../../infrastructure/filesystem';

export type FileToVariantIds = Map<string, string[]>;

function getVariantFiles(variantDir: FileInfo): string[] {
    return variantDir.getAllFiles().map((file: FileInfo) => {
        return jsonBasename(relativePath(variantDir.path, file.path));
    });
}

class VariantRepo {
    public fetchFileVariantIds(variantDir: string): Promise<FileToVariantIds> {
        return filesystem.readDir(variantDir)
            .then((fileInfo: FileInfo) => {
                return fileInfo.filterFiles(/\.json$/).filterEmptyDirs().children;
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
}

export const variantRepo = new VariantRepo();