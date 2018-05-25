import {SettingsRepo} from '../../../../domain/repositories/SettingsRepo';
import {GlobalSettings} from '../../../../domain/states/objects/settings/GlobalSettings';
import {SettingsState} from '../../../../domain/states/SettingsState';
import {container} from '../../container';

const settingsState: SettingsState = container.get(SettingsState);
const settingsRepo: SettingsRepo   = container.get(SettingsRepo);

export function toggleSettingInlineForms(): Promise<void> {
    return settingsRepo.updateGlobalSettings((settings: GlobalSettings): GlobalSettings => {
        settings.inlineForms = !settings.inlineForms;

        settingsState.setGlobalSettings(settings);

        return settings;
    });
}