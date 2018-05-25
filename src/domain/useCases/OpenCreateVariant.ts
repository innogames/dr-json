import {injectable} from 'inversify';
import {EditorState} from '../states/EditorState';

@injectable()
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