import * as fs from 'fs-extra';
import {injectable} from 'inversify';
import {FileInfo} from '../../../domain/context/fs/FileInfo';
import {FilesystemInterface} from '../../../domain/context/fs/FilesystemInterface';
import {joinPath} from '../../../domain/helpers/value/path';

@injectable()
export class FilesystemImpl implements FilesystemInterface {

    public readDir(dir: string): Promise<FileInfo | null> {
        return new Promise((resolve) => {
            if (!fs.existsSync(dir)) {
                resolve(null);
                return;
            }

            if (!fs.statSync(dir).isDirectory()) {
                throw new Error(`try to read dir, but dir is not a directory (${dir})`);
            }

            resolve(this.createFileInfo(dir));
        });
    }

    public readJson<R>(file: string): Promise<R> {
        return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err: NodeJS.ErrnoException, content: string) => {
                if (err) {
                    reject(err);
                    return;
                }

                let data;

                try {
                    data = JSON.parse(content);
                } catch (jsonErr) {
                    if (jsonErr instanceof SyntaxError) {
                        jsonErr.message = file + ': ' + jsonErr.message;
                    }

                    reject(jsonErr);
                    return;
                }

                resolve(data as R);
            });
        });
    }

    public readJsonIfExists<R>(file: string, defaultValue: R): Promise<R> {
        return fs.access(file, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false)
            .then((fileExists) => {
                if (!fileExists) {
                    return defaultValue;
                }

                return this.readJson<R>(file);
            });
    }

    public readJsonSync<R = any>(file: string): R {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    public writeJson(file: string, data: any): Promise<void> {
        return new Promise((resolve) => {
            const options = {
                spaces:   4,
                encoding: 'utf8',
            };

            fs.ensureFile(file)
                .then(() => fs.writeJson(file, data, options))
                .then(resolve);
        });
    }

    public writeCsv(path: string, data: string): Promise<void> {
        return new Promise((resolve) => {
            fs.ensureFile(path)
                .then(() => fs.writeFile(path, data, 'utf8'))
                .then(resolve);
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
