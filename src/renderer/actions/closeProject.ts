import {editorStore} from '../stores/editorStore';
import {projectStore} from '../stores/projectStore';
import {schemaStore} from '../stores/schemaStore';
import {settingsStore} from '../stores/settingsStore';

export function closeProject() {
    editorStore.closeAll();
    projectStore.reset();
    schemaStore.reset();
    settingsStore.setProjectFile(null);
}