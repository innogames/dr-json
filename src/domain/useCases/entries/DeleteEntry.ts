import {injectable} from 'inversify';
import {DataRepo} from '../../repositories/DataRepo';
import {EditorState} from '../../states/EditorState';
import {DataEntries} from '../../states/objects/editor/DataEntries';
import {DataEntry, EntryId} from '../../states/objects/editor/DataEntry';

@injectable()
export class DeleteEntry {

    constructor(
        private editorState: EditorState,
        private dataRepo: DataRepo,
    ) {
    }

    execute(file: string, entryId: EntryId): Promise<void> {
        return this.dataRepo.load(file)
            .then((entries: DataEntries) => entries.all.filter((e: DataEntry) => {
                return e.id != entryId;
            }))
            .then((entries: DataEntry[]) => this.dataRepo.save(file, entries))
            .then((entries: DataEntries) => {
                if (this.editorState.currentFile) {
                    this.editorState.currentFile.setEntries(entries);
                }
            });
    }
}