import {action, observable} from 'mobx';

export type EntryId = string | number;

export class DataEntry {
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
    toggleEditMode(active: boolean): void {
        this._editMode = active;
    }

    @action
    setCollapsed(collapsed: boolean): void {
        this._collapsed = collapsed;
    }
}