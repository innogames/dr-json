import {errorToString} from '../../shared/common/errorToString';
import {DataFileType} from '../entities/project/DataDir';
import {Project, ProjectConfig} from '../entities/project/Project';
import {validateProjectConfig} from '../functions/domain/validateProjectConfig';
import {readJsonFile} from '../functions/infrastructure/fs/readJsonFile';
import {projectStore} from '../stores/projectStore';
import {schemaStore} from '../stores/schemaStore';
import {settingsStore} from '../stores/settingsStore';
import {closeProject} from './closeProject';
import {loadProjectFiles} from './loadProjectFiles';

export function openProject(projectFile: string): Promise<void> {
    closeProject();

    projectStore.setLoading();

    return readJsonFile<ProjectConfig>(projectFile)
        .then(validateProjectConfig)
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

