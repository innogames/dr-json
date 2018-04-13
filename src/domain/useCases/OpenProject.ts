import {ProjectRepo} from '../repositories/ProjectRepo';
import {SchemaRepo} from '../repositories/SchemaRepo';
import {SettingsRepo} from '../repositories/SettingsRepo';
import {ProjectConfigValidator} from '../services/validator/ProjectConfigValidator';
import {SchemaDir} from '../states/objects/fileTree/SchemaDir';
import {SchemaTree} from '../states/objects/fileTree/SchemaTree';
import {SchemaTreeItem} from '../states/objects/fileTree/SchemaTreeItem';
import {Project} from '../states/objects/Project';
import {ProjectConfig} from '../states/objects/ProjectConfig';
import {ProjectState} from '../states/ProjectState';
import {SettingsState} from '../states/SettingsState';
import {CloseProject} from './CloseProject';

export class OpenProject {

    constructor(
        private closeProject: CloseProject,
        private projectRepo: ProjectRepo,
        private settingsRepo: SettingsRepo,
        private schemaRepo: SchemaRepo,
        private projectConfigValidator: ProjectConfigValidator,
        private projectState: ProjectState,
        private settingsState: SettingsState,
    ) {
    }

    execute(projectFile: string): Promise<void> {
        return this.closeProject.execute()
            .then(() => this.projectState.setLoading())
            .then(() => this.projectRepo.loadConfig(projectFile))
            .then((config: ProjectConfig) => this.projectConfigValidator.validate(config))
            .then((config: ProjectConfig): Promise<Project> => {
                const project: Project = new Project(projectFile, config, new SchemaTree([]));

                return this.schemaRepo.loadFileTree(project.schemaPath, project.dataPath, project.variantDataPath)
                    .then((schemaTree: SchemaTree) => {
                        schemaTree = this.restoreCollapsedState(schemaTree);
                        project.setSchemaTree(schemaTree);
                        return project;
                    });
            })
            .then((project: Project) => {
                this.projectState.setLoaded(project);
                return this.settingsRepo.saveLastProjectFile(projectFile);
            })
            .catch((error: any) => {
                this.projectState.setError(error);
                return this.settingsRepo.saveLastProjectFile(null);
            });
    }

    private restoreCollapsedState(schemaTree: SchemaTree): SchemaTree {
        return schemaTree.map((item: SchemaTreeItem): SchemaTreeItem => {
            if (item instanceof SchemaDir && this.settingsState.collapsedDirs.indexOf(item.basename) >= 0) {
                item.setCollapsed(true);
            }

            return item;
        });
    }
}
