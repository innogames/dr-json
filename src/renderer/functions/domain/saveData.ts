import {jsonFile} from '../../../shared/infrastructure/jsonFile';
import {DataEntry} from '../../entities/editor/DataEntry';

export function saveData(file: string, entries: DataEntry[]): Promise<DataEntry[]> {
    return new Promise((resolve) => {
        return jsonFile.write(file, entries.map((entry: DataEntry) => entry.data))
            .then(() => {
                resolve(entries);
            });
    });
}