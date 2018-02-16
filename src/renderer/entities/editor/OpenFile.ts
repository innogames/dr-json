import {DataEntry} from '@/entities/editor/DataEntry';
import {FileContent} from '@/entities/editor/FileContent';
import {DataFile} from '@/entities/project/DataFile';
import {action, observable} from 'mobx';

export class OpenFile {
    @observable private _file: DataFile;
    @observable private _isLoading: boolean = false;
    @observable private _content: FileContent;
    @observable private _error: string;
    @observable private _searchText: string;
    @observable private _createMode: boolean;
    @observable private _createModeEntry: DataEntry;
    @observable private _addVariantMode: boolean;

    constructor(file: DataFile) {
        this._file      = file;
        this._isLoading = true;
    }

    get file(): DataFile {
        return this._file;
    }

    get content(): FileContent | null {
        return this._content;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get error(): string {
        return this._error;
    }

    @action
    setLoading(): void {
        this._isLoading  = true;
        this._content    = null;
        this._error      = '';
        this._searchText = '';
        this.closeCreateMode();
    }

    @action
    setFileLoaded(content: FileContent): void {
        this._isLoading = false;
        this._content   = content;
    }

    @action
    setError(error: string): void {
        this._isLoading = false;
        this._error     = error;
    }

    get searchText(): string {
        return this._searchText;
    }

    @action
    search(text: string): void {
        this._searchText = text;
    }

    get isCreateMode(): boolean {
        return this._createMode;
    }

    get createByEntry(): DataEntry | null {
        return this._createModeEntry;
    }

    @action
    openCreateMode(byEntry: DataEntry = null) {
        this._createMode = true;

        if (byEntry) {
            this._createModeEntry = new DataEntry(null, byEntry.data);
        }
    }

    @action
    closeCreateMode(): void {
        this._createMode      = false;
        this._createModeEntry = null;
    }

    get isAddVariantMode(): boolean {
        return this._addVariantMode;
    }

    @action
    openAddVariant(): void {
        this._addVariantMode = true;
    }

    @action
    closeAddVariant(): void {
        this._addVariantMode = false;
    }
}