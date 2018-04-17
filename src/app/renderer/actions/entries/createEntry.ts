import {DataEntry} from '../../../../domain/states/objects/editor/DataEntry';
import {useCases} from '../../container';

export function createEntry(file: string, entry: DataEntry): Promise<void> {
    return useCases.createEntry.execute(file, entry);
}