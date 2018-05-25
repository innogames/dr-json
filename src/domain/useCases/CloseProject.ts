import {injectable} from 'inversify';
import {SettingsRepo} from '../repositories/SettingsRepo';
import {EditorState} from '../states/EditorState';
import {ProjectState} from '../states/ProjectState';

@injectable()
export class CloseProject {

    constructor(
        private projectState: ProjectState,
        private editorState: EditorState,
        private settingsRepo: SettingsRepo,
    ) {
    }

    execute(): Promise<void> {
        this.projectState.setClosed();
        this.editorState.closeAll();
        return this.settingsRepo.saveLastProjectFile(null);
    }
}