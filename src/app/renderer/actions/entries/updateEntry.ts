import {DataEntry, EntryId} from '../../../../domain/states/objects/editor/DataEntry';
import {useCases} from '../../container';

export function updateEntry(file: string, entryId: EntryId | null, newEntry: DataEntry): Promise<void> {
    return useCases.updateEntry.execute(file, entryId, newEntry);
}