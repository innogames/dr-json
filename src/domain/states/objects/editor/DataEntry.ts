import {action, observable} from 'mobx';

export type EntryId = string | number;

export class DataEntry {
    @observable private _error: any         = null;
    @observable private _editMode: boolean  = false;
    @observable private _collapsed: boolean = false;

    constructor(
        private _id: EntryId | null,
        private _data: any,
    ) {
    }

    get id(): EntryId | null {
        return this._id;
    }

    get data(): any {
        return this._data;
    }

    get error(): any {
        return this._error;
    }

    get editMode(): boolean {
        return this._editMode;
    }

    get collapsed(): boolean {
        return this._collapsed;
    }

    toJson(): string {
        return JSON.stringify(this.data);
    }

    @action
    setError(error: any): void {
        this._error = error;
    }

    @action
    toggleEditMode(active: boolean): void {
        this._editMode  = active;
        this._collapsed = false;
    }

    @action
    setCollapsed(collapsed: boolean): void {
        if (!this._editMode) {
            this._collapsed = collapsed;
        }
    }
}