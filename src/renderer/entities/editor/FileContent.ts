import {action, observable} from 'mobx';
import {DataEntry} from './DataEntry';

export class FileContent {
    @observable private entries: DataEntry[] = [];

    constructor(entries: DataEntry[]) {
        this.entries = entries;
    }

    getAll(): DataEntry[] {
        return this.entries;
    }

    getById(entryId: string): DataEntry | null {
        return this.entries.find((entry: DataEntry) => {
                return entry.id === entryId;
            }) || null;
    }

    @action
    set(entries: DataEntry[]) {
        this.entries = entries;
    }

    @action
    remove(entryId: string): void {
        this.entries = this.entries.filter((entry: DataEntry) => {
            return entry.id != entryId;
        });
    }
}

