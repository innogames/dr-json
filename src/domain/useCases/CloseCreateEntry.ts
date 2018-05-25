import {injectable} from 'inversify';
import {EditorState} from '../states/EditorState';

@injectable()
export class CloseCreateEntry {

    constructor(
        private editorState: EditorState,
    ) {
    }

    execute(): Promise<void> {
        if (!this.editorState.currentFile) {
            return Promise.resolve();
        }

        this.editorState.currentFile.closeCreateMode();

        return Promise.resolve();
    }
}