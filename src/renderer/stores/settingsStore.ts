import {action, observable} from 'mobx';
const electronSettings = require('electron-settings');

class Settings {
    constructor(
        public readonly inlineForms: boolean,
    ) {
    }
}

export class SettingsStore {
    @observable private settings: Settings;

    constructor() {
        this.reloadSettings();
    }

    get(): Settings {
        return this.settings;
    }

    @action
    setProjectFile(projectFile: string | null) {
        electronSettings.set('projectFile', projectFile);
    }

    get projectFile(): string {
        return electronSettings.get('projectFile');
    }

    toggleInlineForms() {
        electronSettings.set('inlineForms', !this.settings.inlineForms);
        this.reloadSettings();
    }

    @action
    private reloadSettings() {
        this.settings = new Settings(
            electronSettings.get('inlineForms') || false,
        );
    }

    @action
    setCollapsedDirs(dirs: string[]) {
        electronSettings.set('collapsedDirs', dirs);
    }

    get collapsedDirs(): string[] {
        return electronSettings.get('collapsedDirs') || [];
    }
}

export const settingsStore = new SettingsStore();