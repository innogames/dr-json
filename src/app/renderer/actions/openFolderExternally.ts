import {shell} from 'electron';
import {states} from '../container';

export function openFolderExternally(): void {
    shell.openExternal(`file://${states.projectState.project.rootPath}`);
}
