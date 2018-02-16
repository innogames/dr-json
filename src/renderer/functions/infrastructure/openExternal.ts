import {shell} from 'electron';

export function openExternal(url: string): void {
    if (url) {
        shell.openExternal(url);
    }
}
