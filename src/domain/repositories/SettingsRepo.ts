import {inject, injectable} from 'inversify';
import {SettingsStorageId, SettingsStorageInterface} from '../context/settings/SettingsStorageInterface';
import {GlobalSettings} from '../states/objects/settings/GlobalSettings';
import {ProjectSettings} from '../states/objects/settings/ProjectSettings';

interface ProjectSetting {
    projectName: string;
    projectFile: string;
    settings: ProjectSettings;
}

@injectable()
export class SettingsRepo {

    constructor(
        @inject(SettingsStorageId) private storage: SettingsStorageInterface,
    ) {
    }

    public saveLastProjectFile(projectFile: string | null): Promise<void> {
        this.storage.save('projectFile', projectFile);
        return Promise.resolve();
    }

    public loadLastProjectFile(): Promise<string | null> {
        return Promise.resolve(this.storage.load<string | null>('projectFile', null));
    }

    public saveGlobalSettings(settings: GlobalSettings): Promise<void> {
        this.storage.save('globalSettings', settings);
        return Promise.resolve();
    }

    public loadGlobalSettings(): Promise<GlobalSettings> {
        const settings: GlobalSettings = this.storage.load<GlobalSettings>('globalSettings', {
            inlineForms: false,
        });

        return Promise.resolve(settings);
    }

    public saveProjectSettings(projectName: string, projectFile: string, settings: ProjectSettings): Promise<void> {
        let allSettings: ProjectSetting[] = this.loadAllProjectSettings()
            .filter((s: ProjectSetting) => s.projectFile != projectFile);

        allSettings.push({
            projectName: projectName,
            projectFile: projectFile,
            settings:    settings,
        });

        this.storage.save('projectSettings', allSettings);

        return Promise.resolve();
    }

    public loadProjectSettings(projectFile: string): Promise<ProjectSettings> {
        let allSettings: ProjectSetting[] = this.loadAllProjectSettings();

        for (let setting of allSettings) {
            if (setting.projectFile == projectFile) {
                return Promise.resolve(setting.settings);
            }
        }

        return Promise.resolve({
            collapsedDirs: [],
        });
    }

    public updateGlobalSettings(update: (settings: GlobalSettings) => GlobalSettings): Promise<void> {
        return this.loadGlobalSettings()
            .then(update)
            .then((settings: GlobalSettings) => this.saveGlobalSettings(settings));
    }

    public updateProjectSettings(
        projectName: string,
        projectFile: string,
        update: (settings: ProjectSettings) => ProjectSettings,
    ): Promise<void> {
        return this.loadProjectSettings(projectFile)
            .then(update)
            .then((settings: ProjectSettings) => this.saveProjectSettings(projectName, projectFile, settings));
    }

    private loadAllProjectSettings(): ProjectSetting[] {
        let allSettings: ProjectSetting[] = this.storage.load<ProjectSetting[]>('projectSettings', []);

        if (!Array.isArray(allSettings)) {
            allSettings = [];
        }

        return allSettings;
    }
}