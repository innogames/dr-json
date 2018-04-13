import {action, observable} from 'mobx';

export type EntryId = string | number;

export class DataEntry {
    id: EntryId | null;
    data: any;
    @observable editMode: boolean = false;

    constructor(id: string | null, data: any) {
        this.id   = id;
        this.data = data;
    }

    toJson(): string {
        return JSON.stringify(this.data);
    }

    @action
    toggleEditMode(active: boolean): void {
        this.editMode = active;
    }
}