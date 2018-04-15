import {DataEntry} from '../../../app/renderer/entities/editor/DataEntry';

export function filterEntriesBySearch(entries: DataEntry[], search: string): DataEntry[] {
    if (!search) {
        return entries;
    }

    search = search.toLowerCase();

    return entries.filter((entry: DataEntry) => {
        const haystack = entry.toJson().replace('\\', '').toLowerCase();
        return haystack.indexOf(search) >= 0;
    });
}
