import {DataEntry} from '../entities/editor/DataEntry';
import {jsonFile} from '../../infrastructure/jsonFile';

class DataRepo {

    public load(file: string): Promise<DataEntry[]> {
        return jsonFile.readIfExists<any[]>(file, [])
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
            return jsonFile.write(file, entries.map((entry: DataEntry) => entry.data))
                .then(() => {
                    resolve(entries);
                });
        });
    }
}

export const dataRepo = new DataRepo();