import {SchemaConfig} from '@/entities/json/SchemaConfig';
import {DataDir, DataFileType} from '@/entities/project/DataDir';
import {DataFile} from '@/entities/project/DataFile';
import {settingsStore} from '@/stores/settingsStore';
import {action, observable, reaction, toJS} from 'mobx';

export class SchemaStore {
    @observable private schemas: Map<string, SchemaConfig> = new Map<string, SchemaConfig>();
    @observable private _files: DataFileType[]             = [];

    get(file: string): SchemaConfig | null {
        const config: SchemaConfig = this.schemas.get(file);
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
                let found: DataFile = this.findFileRecursive((file as DataDir).children, basename);
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
