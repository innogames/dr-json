import {DataEntry} from '../../app/renderer/entities/editor/DataEntry';
import {FilesystemInterface} from '../context/fs/FilesystemInterface';

export class DataRepo {
    constructor(
        private filesystem: FilesystemInterface,
    ) {
    }

    public load(file: string): Promise<DataEntry[]> {
        return this.filesystem.readJsonIfExists<any[]>(file, [])
            .then((entries: any[]) => {
                if (!Array.isArray(entries)) {
                    throw new Error(`data file should be an array, but is of type ${typeof entries} (${file})`);
                }

                return entries.map((entry: any, idx: number) => {
                    if (!entry || !entry.id) {
                        throw new Error(`entry should have an id property in ${file} at index #${idx}`);
                    }

                    return new DataEntry(entry.id, entry);
                });
            });
    }

    public save(file: string, entries: DataEntry[]): Promise<DataEntry[]> {
        return new Promise((resolve) => {
            return this.filesystem.writeJson(file, entries.map((entry: DataEntry) => entry.data))
                .then(() => {
                    resolve(entries);
                });
        });
    }
}
