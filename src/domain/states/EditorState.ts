import {injectable} from 'inversify';
import {action, observable} from 'mobx';
import {ActiveFile} from './objects/editor/ActiveFile';

@injectable()
export class EditorState {
    @observable private _activeFiles: ActiveFile[] = [];
    @observable private _isAddVariantMode: boolean = false;

    get currentFile(): ActiveFile | null {
        return this._activeFiles.length > 0 ? this._activeFiles[0] : null;
    }

    @action
    open(file: ActiveFile): void {
        this._activeFiles = [file];
    }

    @action
    closeAll(): void {
        this._activeFiles      = [];
        this._isAddVariantMode = false;
    }

    get isAddVariantMode(): boolean {
        return this._isAddVariantMode;
    }

    @action
    setAddVariantMode(active: boolean): void {
        this._isAddVariantMode = active;
    }
}
