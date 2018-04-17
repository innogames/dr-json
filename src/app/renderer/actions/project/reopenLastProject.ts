import {settingsRepo, states} from '../../container';
import {closeProject} from './closeProject';
import {openProject} from './openProject';

export function reopenLastProject(): Promise<void> {
    states.projectState.setLoading();

    return settingsRepo.loadLastProjectFile()
        .then((projectFile: string | null) => {
            if (projectFile) {
                return openProject(projectFile);
            }

            return closeProject();
        });
}