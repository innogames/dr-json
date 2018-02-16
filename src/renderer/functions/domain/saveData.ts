import {DataEntry} from '@/entities/editor/DataEntry';
import {writeJsonFile} from '@/functions/infrastructure/fs/writeJsonFile';

export function saveData(file: string, entries: DataEntry[]): Promise<DataEntry[]> {
    return new Promise((resolve) => {
        return writeJsonFile(file, entries.map((entry: DataEntry) => entry.data))
            .then(() => {
                resolve(entries);
            });
    });
}