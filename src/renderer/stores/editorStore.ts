import {action, observable} from 'mobx';
import {OpenFile} from '../entities/editor/OpenFile';

export class EditorStore {
    @observable private openFile: OpenFile | null = null;

    get currentFile(): OpenFile | null {
        return this.openFile;
    }

    @action
    open(file: OpenFile): void {
        this.openFile = file;
    }

    @action
    closeAll(): void {
        this.openFile = null;
    }
}

export const editorStore = new EditorStore();