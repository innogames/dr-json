import {FilesystemInterface} from '../context/fs/FilesystemInterface';
import {ProjectConfig, ProjectConfigData} from '../states/objects/ProjectConfig';

export class ProjectRepo {
    constructor(
        private filesystem: FilesystemInterface,
    ) {
    }

    public loadConfig(projectFile: string): Promise<ProjectConfig> {
        return this.filesystem.readJson<ProjectConfigData>(projectFile)
            .then((configData: ProjectConfigData) => {
                return new ProjectConfig(configData);
            });
    }

}