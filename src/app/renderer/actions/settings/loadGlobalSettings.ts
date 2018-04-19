import {GlobalSettings} from '../../../../domain/states/objects/settings/GlobalSettings';
import {settingsRepo, states} from '../../container';

export function loadGlobalSettings(): Promise<void> {
    return settingsRepo.loadGlobalSettings()
        .then((settings: GlobalSettings) => {
            states.settingsState.setGlobalSettings(settings);
        });
}