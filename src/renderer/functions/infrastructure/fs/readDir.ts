import {FileInfo} from '@/entities/fs/FileInfo';
import {joinPath} from '@/functions/common/value/path';
import * as fs from 'fs';

export function readDir(dir: string): Promise<FileInfo> {
    return new Promise((resolve) => {
        if (!fs.statSync(dir).isDirectory()) {
            throw new Error(`try to read dir, but dir is not a directory (${dir})`);
        }

        resolve(createFileInfo(dir));
    });
}

function createFileInfo(filePath: string): FileInfo {
    const stats: fs.Stats    = fs.statSync(filePath);
    const isDir: boolean     = stats.isDirectory();
    let children: FileInfo[] = [];

    if (isDir) {
        children = fs.readdirSync(filePath)
            .map((filename: string) => {
                return createFileInfo(joinPath(filePath, filename));
            });
    }

    return new FileInfo(filePath, isDir, children);
}