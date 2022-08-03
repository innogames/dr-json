import {DataEntry, EntryId} from '../../../../domain/states/objects/editor/DataEntry';
import {UpdateEntry} from '../../../../domain/useCases/entries/UpdateEntry';
import {container} from '../../container';

const useCase: UpdateEntry = container.get(UpdateEntry);

export function updateEntry(file: string, entryId: EntryId | null, newEntry: DataEntry): Promise<void> {
    return useCase.execute(file, entryId, newEntry);
}
