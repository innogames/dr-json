import {action, observable} from 'mobx';
import {DataEntries} from './DataEntries';
import {DataEntry} from './DataEntry';

export class ActiveFile {
    @observable private _filename: string;
    @observable private _variantId: string | null          = null;
    @observable private _isLoading: boolean                = false;
    @observable private _error: any                        = null;
    @observable private _entries: DataEntries              = new DataEntries();
    @observable private _searchText: string                = '';
    @observable private _createMode: boolean               = false;
    @observable private _createModeEntry: DataEntry | null = null;

    constructor(filename: string, variantId: string | null = null) {
        this._filename  = filename;
        this._variantId = variantId;
        this._isLoading = true;
    }

    get filename(): string {
        return this._filename;
    }

    get variantId(): string | null {
        return this._variantId;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get error(): any {
        return this._error;
    }

    get entries(): DataEntries {
        return this._entries;
    }

    get searchText(): string {
        return this._searchText;
    }

    get isCreateMode(): boolean {
        return this._createMode;
    }

    get createModeEntry(): DataEntry | null {
        return this._createModeEntry;
    }

    @action
    setLoading(): void {
        this._isLoading  = true;
        this._entries    = new DataEntries();
        this._error      = null;
        this._searchText = '';
        this.closeCreateMode();
    }

    @action
    setLoaded(entries: DataEntries): void {
        this._isLoading = false;
        this._entries   = entries;
    }

    @action
    setError(error: any): void {
        this._isLoading = false;
        this._error     = error;
    }

    @action
    setEntries(entries: DataEntries) {
        this._entries = entries;
    }

    @action
    search(text: string): void {
        this._searchText = text;
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
}