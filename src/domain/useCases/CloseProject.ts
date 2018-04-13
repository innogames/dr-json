import {SettingsRepo} from '../repositories/SettingsRepo';
import {ProjectState} from '../states/ProjectState';

export class CloseProject {

    constructor(
        private projectState: ProjectState,
        private settingsRepo: SettingsRepo,
    ) {
    }

    execute(): Promise<void> {
        this.projectState.setClosed();
        //TODO: editorState.closeAll()
        return this.settingsRepo.saveLastProjectFile(null);
    }
}