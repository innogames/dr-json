import {openExternal} from '@/functions/infrastructure/openExternal';
import {projectStore} from '@/stores/projectStore';

export function openFolderExternally(): void {
    openExternal(`file://${projectStore.current.rootFolder}`);
}

