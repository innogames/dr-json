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
        return this.storage.load<string | null>('projectFile', null);
    }

    public saveGlobalSettings(settings: GlobalSettings): Promise<void> {
        this.storage.save('globalSettings', settings);
        return Promise.resolve();
    }

    public loadGlobalSettings(): Promise<GlobalSettings> {
        return this.storage.load<GlobalSettings>('globalSettings', {
            inlineForms: false,
        });
    }

    public saveProjectSettings(projectName: string, projectFile: string, settings: ProjectSettings): Promise<void> {
        this.loadAllProjectSettings()
          .then(result => {
              let allSettings = result.filter((s: ProjectSetting) => s.projectFile != projectFile);
              allSettings.push({
                  projectName: projectName,
                  projectFile: projectFile,
                  settings:    settings,
              });

              this.storage.save('projectSettings', allSettings);
          });

        return Promise.resolve();
    }

    public loadProjectSettings(projectFile: string): Promise<ProjectSettings> {
        return this.loadAllProjectSettings().then(result => {
            for (let setting of result) {
                if (setting.projectFile == projectFile) {
                    let settings = setting.settings;
                    if(!settings.collapsedDirs)
                    {
                        settings.collapsedDirs = [];
                    }

                    if(!settings.rewardDirs)
                    {
                        settings.rewardDirs = [];
                    }

                    return settings;
                }
            }

            return {
                collapsedDirs: [],
                rewardDirs: [],
            };
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

    private loadAllProjectSettings(): Promise<ProjectSetting[]> {
        return this.storage.load<ProjectSetting[]>('projectSettings', []);
    }
}
