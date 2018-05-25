import {shell} from 'electron';
import {ProjectState} from '../../../domain/states/ProjectState';
import {container} from '../container';

const projectState: ProjectState = container.get(ProjectState);

export function openFolderExternally(): void {
    shell.openExternal(`file://${projectState.project.rootPath}`);
}
