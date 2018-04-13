import {FilesystemInterface} from '../context/fs/FilesystemInterface';
import {DataEntries} from '../states/objects/editor/DataEntries';
import {DataEntry} from '../states/objects/editor/DataEntry';

export class DataRepo {
    constructor(
        private filesystem: FilesystemInterface,
    ) {
    }

    public load(file: string): Promise<DataEntries> {
        return this.filesystem.readJsonIfExists<any[]>(file, [])
            .then((jsonContent: any[]) => {
                if (!Array.isArray(jsonContent)) {
                    throw new Error(`data file should be an array, but is of type ${typeof jsonContent} (${file})`);
                }

                const entries: DataEntry[] = jsonContent.map((data: any, idx: number) => {
                    if (!data || !data.id) {
                        throw new Error(`entry should have an id property in ${file} at index #${idx}`);
                    }

                    return new DataEntry(entry.id, data);
                });

                return new DataEntries(entries);
            });
    }

    public save(file: string, entries: DataEntry[]): Promise<DataEntries> {
        return new Promise((resolve) => {
            return this.filesystem.writeJson(file, entries.map((entry: DataEntry) => entry.data))
                .then(() => {
                    resolve(new DataEntries(entries));
                });
        });
    }
}
