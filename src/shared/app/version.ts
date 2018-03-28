import {app, App, remote} from 'electron';
import {isDev} from './environment';
import {packageJson} from './package';

const electronApp: App = app || remote.app;

export function getAppVersion(): string {
    if (!isDev()) {
        return electronApp.getVersion();
    }

    return packageJson.version;
}
