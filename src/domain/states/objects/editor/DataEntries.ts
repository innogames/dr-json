import {observable} from 'mobx';
import {DataEntry, EntryId} from './DataEntry';

export class DataEntries {
    @observable private _entries: DataEntry[] = [];

    constructor(entries: DataEntry[] = []) {
        this._entries = entries;
    }

    get all(): DataEntry[] {
        return this._entries;
    }

    getById(entryId: EntryId): DataEntry | null {
        return this._entries.find((entry: DataEntry) => {
                return entry.id === entryId;
            }) || null;
    }
}
