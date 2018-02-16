import {OpenFile} from '@/entities/editor/OpenFile';
import {action, observable} from 'mobx';


export class EditorStore {
    @observable private openFile: OpenFile;

    get currentFile(): OpenFile {
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