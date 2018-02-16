import {editorStore} from '@/stores/editorStore';

export function searchInFile(text: string): void {
    editorStore.currentFile.search(text);
}