import {editorStore} from '../stores/editorStore';

export function searchInFile(text: string): void {
    if (editorStore.currentFile) {
        editorStore.currentFile.search(text);
    }
}