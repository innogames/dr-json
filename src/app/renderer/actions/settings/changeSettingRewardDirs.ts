import {SettingsRepo} from '../../../../domain/repositories/SettingsRepo';
import {ProjectSettings} from '../../../../domain/states/objects/settings/ProjectSettings';
import {ProjectState} from '../../../../domain/states/ProjectState';
import {SettingsState} from '../../../../domain/states/SettingsState';
import {container} from '../../container';

const projectState: ProjectState   = container.get(ProjectState);
const settingsState: SettingsState = container.get(SettingsState);
const settingsRepo: SettingsRepo   = container.get(SettingsRepo);

export function changeSettingRewardDirs(rewardDirs: string[]): Promise<void> {
    if (!projectState.hasProject) {
        return Promise.resolve();
    }

    return settingsRepo.updateProjectSettings(
        projectState.project.config.name,
        projectState.project.file,
        (settings: ProjectSettings): ProjectSettings => {
            settings.rewardDirs = rewardDirs;

            settingsState.setProjectSettings(settings);

            return settings;
        },
    );
}