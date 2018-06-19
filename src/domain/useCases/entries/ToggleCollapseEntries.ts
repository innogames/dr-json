import {injectable} from 'inversify';
import {EditorState} from '../../states/EditorState';
import {DataEntry} from '../../states/objects/editor/DataEntry';

@injectable()
export class ToggleCollapseEntries {

    constructor(
        private editorState: EditorState,
    ) {
    }

    execute(collapsed: boolean): Promise<void> {
        if (!this.editorState.currentFile) {
            return Promise.resolve();
        }

        this.editorState.currentFile.entries.all.forEach((entry: DataEntry) => {
            entry.setCollapsed(collapsed);
        });

        return Promise.resolve();
    }
}