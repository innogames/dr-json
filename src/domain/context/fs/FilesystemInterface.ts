import {FileInfo} from './FileInfo';

export interface FilesystemInterface {
    readDir(dir: string): Promise<FileInfo | null>;

    readJson<R>(file: string): Promise<R>;

    readJsonIfExists<R>(file: string, defaultValue: R): Promise<R>;

    readJsonSync<R = any>(file: string): R;

    writeJson(file: string, data: any): Promise<void>;
}