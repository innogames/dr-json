import {openExternal} from '../../../infrastructure/openExternal';
import {projectStore} from '../stores/projectStore';

export function openFolderExternally(): void {
    openExternal(`file://${projectStore.current.rootFolder}`);
}
