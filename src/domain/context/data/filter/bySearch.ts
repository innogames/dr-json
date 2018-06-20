import {DataEntry} from '../../../states/objects/editor/DataEntry';

export function bySearch(search: string): (entry: DataEntry) => boolean {
    if (!search) {
        return () => true;
    }

    search = search.toLowerCase();

    return (entry: DataEntry) => {
        const haystack = entry.toJson().replace('\\', '').toLowerCase();
        return haystack.indexOf(search) >= 0;
    };
}