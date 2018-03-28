import {errorToString} from '../../../common/errorToString';
import {projectConfigValidator} from '../../../domain/services/projectConfigValidator';
import {jsonFile} from '../../../infrastructure/jsonFile';
import {DataFileType} from '../../../domain/entities/project/DataDir';
import {Project, ProjectConfig} from '../../../domain/entities/project/Project';
import {projectStore} from '../stores/projectStore';
import {schemaStore} from '../stores/schemaStore';
import {settingsStore} from '../stores/settingsStore';
import {closeProject} from './closeProject';
import {loadProjectFiles} from './loadProjectFiles';

export function openProject(projectFile: string): Promise<void> {
    closeProject();

    projectStore.setLoading();

    return jsonFile.read<ProjectConfig>(projectFile)
        .then(projectConfigValidator.validate)
        .then((config: ProjectConfig) => {
            settingsStore.setProjectFile(projectFile);

            const project: Project = new Project(projectFile, config);
            projectStore.set(project);

            return loadProjectFiles(project.schemaFolder, project.dataFolder, project.variantDataFolder);
        })
        .then((files: DataFileType[]) => {
            schemaStore.setFiles(files);
        })
        .catch((error: any) => {
            settingsStore.setProjectFile(null);
            projectStore.setError(errorToString(error));
        });
}

