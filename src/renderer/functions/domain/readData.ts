import {DataEntry} from '../../entities/editor/DataEntry';
import {readJsonFileIfExists} from '../infrastructure/fs/readJsonFile';

export function readData(file: string): Promise<DataEntry[]> {
    return readJsonFileIfExists<any[]>(file, [])
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
