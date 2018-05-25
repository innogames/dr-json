import {SettingsRepo} from '../../../../domain/repositories/SettingsRepo';
import {ProjectState} from '../../../../domain/states/ProjectState';
import {container} from '../../container';
import {closeProject} from './closeProject';
import {openProject} from './openProject';

const projectState: ProjectState = container.get(ProjectState);
const settingsRepo: SettingsRepo = container.get(SettingsRepo);

export function reopenLastProject(): Promise<void> {
    projectState.setLoading();

    return settingsRepo.loadLastProjectFile()
        .then((projectFile: string | null) => {
            if (projectFile) {
                return openProject(projectFile);
            }

            return closeProject();
        });
}