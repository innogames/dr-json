import {GlobalSettings} from '../states/objects/settings/GlobalSettings';
import {ProjectSettings} from '../states/objects/settings/ProjectSettings';
const electronSettings = require('electron-settings');

interface ProjectSetting {
    projectName: string;
    projectFile: string;
    settings: ProjectSettings;
}

export class SettingsRepo {

    public saveLastProjectFile(projectFile: string | null): Promise<void> {
        electronSettings.set('projectFile', projectFile);
        return Promise.resolve();
    }

    public loadLastPojectFile(): Promise<string | null> {
        return Promise.resolve(electronSettings.get('projectFile') as string);
    }

    public saveGlobalSettings(settings: GlobalSettings): Promise<void> {
        electronSettings.set('globalSettings', settings);
        return Promise.resolve();
    }

    public loadGlobalSettings(): Promise<GlobalSettings> {
        return Promise.resolve((electronSettings.get('globalSettings') || {}) as GlobalSettings);
    }

    public saveProjectSettings(projectName: string, projectFile: string, settings: ProjectSettings): Promise<void> {
        let allSettings: ProjectSetting[] = this.loadAllProjectSettings()
            .filter((s: ProjectSetting) => s.projectFile != projectFile);

        allSettings.push({
            projectName: projectName,
            projectFile: projectFile,
            settings:    settings,
        });

        electronSettings.set('projectSettings', allSettings);

        return Promise.resolve();
    }

    public loadProjectSettings(projectFile: string): Promise<ProjectSettings | null> {
        let allSettings: ProjectSetting[] = this.loadAllProjectSettings();

        for (let setting of allSettings) {
            if (setting.projectFile == projectFile) {
                return Promise.resolve(setting.settings);
            }
        }

        return Promise.resolve(null);
    }

    private loadAllProjectSettings(): ProjectSetting[] {
        let allSettings: ProjectSetting[] = electronSettings.get('projectSettings');

        if (!Array.isArray(allSettings)) {
            allSettings = [];
        }

        return allSettings;
    }
}