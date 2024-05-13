import {injectable} from 'inversify';
import {EditorState} from '../../states/EditorState';

@injectable()
export class SearchForFileName {

    constructor(
        private editorState: EditorState,
    ) {
    }

    execute(text: string): Promise<void> {
        this.editorState.setFileNameSearchText(text);
        return Promise.resolve();
    }
}