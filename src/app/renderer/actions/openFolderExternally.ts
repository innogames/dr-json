import {shell} from 'electron';
import {projectStore} from '../stores/projectStore';

export function openFolderExternally(): void {
    shell.openExternal(`file://${projectStore.current.rootFolder}`);
}
