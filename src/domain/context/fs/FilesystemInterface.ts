import {FileInfo} from './FileInfo';

export const FilesystemId: symbol = Symbol();

export interface FilesystemInterface {
    readDir(dir: string): Promise<FileInfo | null>;

    readJson<R>(file: string): Promise<R>;

    readJsonIfExists<R>(file: string, defaultValue: R): Promise<R>;

    readJsonSync<R = any>(file: string): R;

    writeJson(file: string, data: any): Promise<void>;

    writeCsv(file: string, data: string): Promise<void>;
}