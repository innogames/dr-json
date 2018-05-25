import {injectable} from 'inversify';
import {DataRepo} from '../repositories/DataRepo';
import {EditorState} from '../states/EditorState';
import {DataEntries} from '../states/objects/editor/DataEntries';
import {DataEntry, EntryId} from '../states/objects/editor/DataEntry';

@injectable()
export class UpdateEntry {

    constructor(
        private editorState: EditorState,
        private dataRepo: DataRepo,
    ) {
    }

    execute(file: string, entryId: EntryId | null, newEntry: DataEntry): Promise<void> {
        return this.dataRepo.load(file)
            .then((entries: DataEntries) => entries.all.map((e: DataEntry) => {
                return e.id == entryId ? newEntry : e;
            }))
            .then((entries: DataEntry[]) => this.dataRepo.save(file, entries))
            .then((entries: DataEntries) => {
                if (this.editorState.currentFile) {
                    this.editorState.currentFile.setEntries(entries);
                }
            });
    }
}