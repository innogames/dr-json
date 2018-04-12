import {mapObj} from './object';

function trimRecursive(value: any) {
    return trim(value, true);
}

export function trim(value: any, recursive: boolean = false): any {
    if (value == null) {
        return value;
    }

    if (typeof value === 'string') {
        return value.trim();
    }

    if (recursive) {
        if (Array.isArray(value)) {
            return value.map(trimRecursive);
        }

        if (typeof value === 'object') {
            return mapObj(value, trimRecursive);
        }
    }

    return value;
}