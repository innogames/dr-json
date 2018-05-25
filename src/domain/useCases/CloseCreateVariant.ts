import {injectable} from 'inversify';
import {EditorState} from '../states/EditorState';

@injectable()
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