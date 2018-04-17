import {EditorState} from '../states/EditorState';

export class OpenCreateVariant {

    constructor(
        private editorState: EditorState,
    ) {
    }

    execute(): Promise<void> {
        this.editorState.setAddVariantMode(true);

        return Promise.resolve();
    }
}