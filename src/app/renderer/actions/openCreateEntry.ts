import {DataEntry} from '../entities/editor/DataEntry';
import {editorStore} from '../stores/editorStore';

export function openCreateEntry(fromEntry: DataEntry | null = null) {
    if (editorStore.currentFile) {
        editorStore.currentFile.openCreateMode(fromEntry);
    }
}