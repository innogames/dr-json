import {ProjectConfigValidator} from '../context/config/ProjectConfigValidator';
import {FilesystemInterface} from '../context/fs/FilesystemInterface';
import {ProjectConfig, ProjectConfigData} from '../states/objects/ProjectConfig';

export class ProjectRepo {
    constructor(
        private filesystem: FilesystemInterface,
        private projectConfigValidator: ProjectConfigValidator,
    ) {
    }

    public loadConfig(projectFile: string): Promise<ProjectConfig> {
        return this.filesystem.readJson<ProjectConfigData>(projectFile)
            .then((configData: ProjectConfigData) => this.projectConfigValidator.validate(configData))
            .then((configData: ProjectConfigData) => {
                return new ProjectConfig(configData);
            });
    }

}