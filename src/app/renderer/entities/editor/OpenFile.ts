import {action, observable} from 'mobx';
import {DataFile} from '../project/DataFile';
import {DataEntry} from './DataEntry';

export class OpenFile {
    @observable private _file: DataFile;
    @observable private _isLoading: boolean                = false;
    @observable private _entries: DataEntry[]              = [];
    @observable private _error: string | null              = null;
    @observable private _searchText: string                = '';
    @observable private _createMode: boolean               = false;
    @observable private _createModeEntry: DataEntry | null = null;
    @observable private _addVariantMode: boolean           = false;

    constructor(file: DataFile) {
        this._file      = file;
        this._isLoading = true;
    }

    get file(): DataFile {
        return this._file;
    }

    get entries(): DataEntry[] {
        return this._entries;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get error(): string {
        return this._error || '';
    }

    getEntryById(entryId: string): DataEntry | null {
        return this._entries.find((entry: DataEntry) => {
                return entry.id === entryId;
            }) || null;
    }

    @action
    setLoading(): void {
        this._isLoading  = true;
        this._entries    = [];
        this._error      = '';
        this._searchText = '';
        this.closeCreateMode();
    }

    @action
    setFileLoaded(entries: DataEntry[]): void {
        this._isLoading = false;
        this._entries   = entries;
    }

    @action
    setError(error: string): void {
        this._isLoading = false;
        this._error     = error;
    }

    @action
    setEntries(entries: DataEntry[]) {
        this._entries = entries;
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
    openCreateMode(byEntry: DataEntry | null = null) {
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