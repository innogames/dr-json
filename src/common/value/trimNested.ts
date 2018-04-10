import {mapObj} from './object';

export function trimNested(value: any): any {
    if (typeof value === 'string') {
        return value.trim();
    }

    if (Array.isArray(value)) {
        return value.map(trimNested);
    }

    if (value == null) {
        return value;
    }

    if (typeof value === 'object') {
        return mapObj(value, trimNested);
    }

    return value;
}