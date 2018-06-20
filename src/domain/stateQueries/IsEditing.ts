import {injectable} from 'inversify';
import {EditorState} from '../states/EditorState';
import {ActiveFile} from '../states/objects/editor/ActiveFile';
import {DataEntry} from '../states/objects/editor/DataEntry';

@injectable()
export class IsEditing {

    constructor(
        private editorState: EditorState,
    ) {
    }

    fetch(): boolean {
        if (this.editorState.isAddVariantMode) {
            return true;
        }

        const currentFile: ActiveFile | null = this.editorState.currentFile;
        if (currentFile) {
            if (currentFile.isCreateMode) {
                return true;
            }

            if (currentFile.entries.all.some((entry: DataEntry) => entry.editMode)) {
                return true;
            }
        }

        return false;
    }
}
