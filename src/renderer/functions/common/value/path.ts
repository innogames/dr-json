import * as path from 'path';

export function joinPath(...paths: string[]): string {
    return path.join(...paths);
}

export function dirname(file: string): string {
    return path.dirname(file);
}

export function basename(filePath: string): string {
    return path.basename(filePath);
}

export function getAbsolutePath(filePath: string, baseDir: string, currentDir: string): string {
    if (filePath.indexOf('/') === 0) {
        return path.join(baseDir, filePath);
    }

    return path.join(currentDir, filePath);
}

export function relativePath(from: string, to: string): string {
    return path.relative(from, to);
}
