import {injectable} from 'inversify';
import {EditorState} from '../states/EditorState';

@injectable()
export class SearchInFile {

    constructor(
        private editorState: EditorState,
    ) {
    }

    execute(text: string): Promise<void> {
        if (this.editorState.currentFile) {
            this.editorState.currentFile.search(text);
        }

        return Promise.resolve();
    }
}