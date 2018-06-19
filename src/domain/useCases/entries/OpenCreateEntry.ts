import {injectable} from 'inversify';
import {EditorState} from '../../states/EditorState';
import {DataEntry} from '../../states/objects/editor/DataEntry';

@injectable()
export class OpenCreateEntry {

    constructor(
        private editorState: EditorState,
    ) {
    }

    execute(byEntry: DataEntry | null = null): Promise<void> {
        if (!this.editorState.currentFile) {
            return Promise.reject('No open file');
        }

        this.editorState.currentFile.openCreateMode(byEntry);

        return Promise.resolve();
    }
}