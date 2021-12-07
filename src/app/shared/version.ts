import {app, App} from 'electron';
import {app as remoteApp} from '@electron/remote';
import {isDev} from './environment';
import {packageJson} from './package';

const electronApp: App = app || remoteApp;

export function getAppVersion(): string {
    if (!isDev()) {
        return electronApp.getVersion();
    }

    return packageJson.version;
}
