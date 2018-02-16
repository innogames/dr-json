import {action, observable} from 'mobx';

export class DataEntry {
    id: string;
    data: any;
    @observable editMode: boolean;

    constructor(id: string, data: any) {
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