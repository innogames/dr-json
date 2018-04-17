import {EditorState} from '../states/EditorState';

export class CloseCreateVariant {

    constructor(
        private editorState: EditorState,
    ) {
    }

    execute(): Promise<void> {
        this.editorState.setAddVariantMode(false);

        return Promise.resolve();
    }
}