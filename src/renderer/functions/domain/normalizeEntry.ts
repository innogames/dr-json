import {DataEntry} from '@/entities/editor/DataEntry';
import {mapObj} from '@/functions/common/value/object';

export function normalizeEntry(entry: DataEntry): DataEntry {
    return new DataEntry(entry.id.trim(), normalizeValue(entry.data));
}

function normalizeValue(value: any): any {
    if (typeof value === 'string') {
        return value.trim();
    }

    if (Array.isArray(value)) {
        return value.map(v => normalizeValue(v));
    }

    if (typeof value === 'object') {
        return mapObj(value, (val: any) => {
            return normalizeValue(val);
        });
    }

    return value;
}