import {ProjectSettings} from '../../../../domain/states/objects/settings/ProjectSettings';
import {settingsRepo, states} from '../../container';

export function changeSettingCollapsedDirs(collapsedDirs: string[]): Promise<void> {
    if (!states.projectState.hasProject) {
        return Promise.resolve();
    }

    return settingsRepo.updateProjectSettings(
        states.projectState.project.config.name,
        states.projectState.project.file,
        (settings: ProjectSettings): ProjectSettings => {
            settings.collapsedDirs = collapsedDirs;

            states.settingsState.setProjectSettings(settings);

            return settings;
        },
    );
}