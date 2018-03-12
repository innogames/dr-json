import {compareNumber, toInt} from './number';

export function compareVersion(version1: string, version2: string): number {
    const v1Parts: number[] = splitVersion(version1);
    const v2Parts: number[] = splitVersion(version2);

    const len: number = Math.min(v1Parts.length, v2Parts.length);

    for (let i = 0; i < len; i++) {
        const val: number = compareNumber(v1Parts[i], v2Parts[i]);
        if (val != 0) {
            return val;
        }
    }

    return compareNumber(v1Parts.length, v2Parts.length);
}

function splitVersion(version: string): number[] {
    version = version.replace(/(\.0+)+$/, '');
    return version.split('.').map((v: string) => toInt(v));
}
