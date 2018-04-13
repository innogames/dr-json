import * as fs from 'fs';
import {FileInfo} from '../domain/context/fs/FileInfo';
import {joinPath} from '../common/value/path';

class Filesystem {

    public readDir(dir: string): Promise<FileInfo> {
        return new Promise((resolve) => {
            if (!fs.statSync(dir).isDirectory()) {
                throw new Error(`try to read dir, but dir is not a directory (${dir})`);
            }

            resolve(this.createFileInfo(dir));
        });
    }

    private createFileInfo(filePath: string): FileInfo {
        const stats: fs.Stats    = fs.statSync(filePath);
        const isDir: boolean     = stats.isDirectory();
        let children: FileInfo[] = [];

        if (isDir) {
            children = fs.readdirSync(filePath)
                .map((filename: string) => {
                    return this.createFileInfo(joinPath(filePath, filename));
                });
        }

        return new FileInfo(filePath, isDir, children);
    }
}

export const filesystem = new Filesystem();