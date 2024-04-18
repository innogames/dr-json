import {injectable} from 'inversify';
import {EditorState} from '../../states/EditorState';

@injectable()
export class SearchForFile {

    constructor(
        private editorState: EditorState,
    ) {
    }

    execute(text: string): Promise<void> {
        this.editorState.setFileSearchText(text);
        return Promise.resolve();
    }
}