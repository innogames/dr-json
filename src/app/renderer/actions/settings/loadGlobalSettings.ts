import {SettingsRepo} from '../../../../domain/repositories/SettingsRepo';
import {GlobalSettings} from '../../../../domain/states/objects/settings/GlobalSettings';
import {SettingsState} from '../../../../domain/states/SettingsState';
import {container} from '../../container';

const settingsState: SettingsState = container.get(SettingsState);
const settingsRepo: SettingsRepo   = container.get(SettingsRepo);

export function loadGlobalSettings(): Promise<void> {
    return settingsRepo.loadGlobalSettings()
        .then((settings: GlobalSettings) => {
            settingsState.setGlobalSettings(settings);
        });
}