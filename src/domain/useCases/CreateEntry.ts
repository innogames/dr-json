import {injectable} from 'inversify';
import {DataRepo} from '../repositories/DataRepo';
import {EditorState} from '../states/EditorState';
import {DataEntries} from '../states/objects/editor/DataEntries';
import {DataEntry} from '../states/objects/editor/DataEntry';

@injectable()
export class CreateEntry {

    constructor(
        private editorState: EditorState,
        private dataRepo: DataRepo,
    ) {
    }

    execute(file: string, entry: DataEntry): Promise<void> {
        return this.dataRepo.load(file)
            .then((entries: DataEntries) => this.dataRepo.save(file, [...entries.all, entry]))
            .then((entries: DataEntries) => {
                if (this.editorState.currentFile) {
                    this.editorState.currentFile.setEntries(entries);
                }
            });
    }
}