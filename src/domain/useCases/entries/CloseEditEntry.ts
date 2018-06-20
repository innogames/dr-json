import {injectable} from 'inversify';
import {EditorState} from '../../states/EditorState';
import {DataEntry} from '../../states/objects/editor/DataEntry';

@injectable()
export class CloseEditEntry {

    constructor(
        private editorState: EditorState,
    ) {
    }

    execute(): Promise<void> {
        if (!this.editorState.currentFile) {
            return Promise.resolve();
        }

        this.editorState.currentFile.entries.all.forEach((entry: DataEntry) => {
            entry.toggleEditMode(false);
        });

        return Promise.resolve();
    }
}