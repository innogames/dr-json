import {DataEntry} from '@/entities/editor/DataEntry';
import {editorStore} from '@/stores/editorStore';

export function openCreateEntry(fromEntry: DataEntry = null) {
    editorStore.currentFile.openCreateMode(fromEntry);
}