import {GlobalSettings} from '../../../../domain/states/objects/settings/GlobalSettings';
import {settingsRepo, states} from '../../container';

export function toggleSettingInlineForms(): Promise<void> {
    return settingsRepo.updateGlobalSettings((settings: GlobalSettings): GlobalSettings => {
        settings.inlineForms = !settings.inlineForms;

        states.settingsState.setGlobalSettings(settings);

        return settings;
    });
}