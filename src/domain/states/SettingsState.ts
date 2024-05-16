import {injectable} from 'inversify';
import {action, observable} from 'mobx';
import {GlobalSettings} from './objects/settings/GlobalSettings';
import {ProjectSettings} from './objects/settings/ProjectSettings';

@injectable()
export class SettingsState {
    @observable private _globalSettings: GlobalSettings = {
        inlineForms: false,
    };

    @observable private _projectSettings: ProjectSettings = {
        collapsedDirs: [],
        rewardDirs: [],
    };

    get globalSettings(): GlobalSettings {
        return this._globalSettings;
    };

    get projectSettings(): ProjectSettings {
        return this._projectSettings;
    };

    @action
    setGlobalSettings(settings: GlobalSettings) {
        this._globalSettings = settings;
    }

    @action
    setProjectSettings(settings: ProjectSettings) {
        this._projectSettings = settings;
    }
}
