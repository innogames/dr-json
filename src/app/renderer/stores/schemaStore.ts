import {action, observable, reaction, toJS} from 'mobx';
import {SchemaConfig} from '../entities/json/SchemaConfig';
import {DataDir, DataFileType} from '../entities/project/DataDir';
import {DataFile} from '../entities/project/DataFile';
import {settingsStore} from './settingsStore';

export class SchemaStore {
    @observable private schemas: Map<string, SchemaConfig> = new Map<string, SchemaConfig>();
    @observable private _files: DataFileType[]             = [];

    get(file: string): SchemaConfig | null {
        const config: SchemaConfig | undefined = this.schemas.get(file);
        if (!config) {
            return null;
        }

        return (toJS(config) as SchemaConfig);
    }

    get files(): DataFileType[] {
        return this._files;
    }

    findFile(basename: string): DataFile | null {
        return this.findFileRecursive(this._files, basename);
    }

    @action
    add(file: string, config: SchemaConfig) {
        this.schemas.set(file, config);
    }

    @action
    setFiles(files: DataFileType[]) {
        this._files = files;
    }

    @action
    updateFile(newFile: DataFile): void {
        this._files = this.mapFiles(this._files, (file: DataFile) => {
            if (file.basename == newFile.basename) {
                return newFile;
            }

            return file;
        });
    }

    @action
    reset(): void {
        this.schemas.clear();
        this._files = [];
    }

    forEachDir(fn: (dir: DataDir) => void): void {
        this.forEachDirRecursive(this._files, fn);
    }

    private findFileRecursive(files: DataFileType[], basename: string): DataFile | null {
        for (let file of files) {
            if (file.isDir) {
                let found: DataFile | null = this.findFileRecursive((file as DataDir).children, basename);
                if (found) {
                    return found;
                }
            }

            if (file.basename == basename) {
                return file as DataFile;
            }
        }

        return null;
    }

    private forEachDirRecursive(files: DataFileType[], fn: (dir: DataDir) => void): void {
        for (let file of files) {
            if (file.isDir) {
                const dir: DataDir = file as DataDir;
                this.forEachDirRecursive(dir.children, fn);
                fn(dir);
            }
        }
    }

    private mapFiles(files: DataFileType[], fn: (file: DataFile) => DataFile): DataFileType[] {
        return files.map((current: DataFileType) => {
            if (current.isDir) {
                let dir: DataDir = current as DataDir;
                dir.children     = this.mapFiles(dir.children, fn);
                return dir;
            } else {
                return fn(current as DataFile);
            }
        });
    }
}

export const schemaStore = new SchemaStore();

// remember the collapsed state of folders in the folder tree, so the states will be the same
// after closing and opening the application again.
reaction(
    () => {
        let collapsed: string[] = [];
        schemaStore.forEachDir((dir: DataDir) => {
            if (dir.collapsed) {
                collapsed.push(dir.basename);
            }
        });
        return collapsed;
    },
    (collapsedDirs: string[]) => {
        settingsStore.setCollapsedDirs(collapsedDirs);
    },
    {
        delay: 1000,
    },
);
