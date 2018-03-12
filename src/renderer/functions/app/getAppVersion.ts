import {remote} from 'electron';
import {isDev} from '../../../shared/app/environment';

const packageJson: any = require('../../../../package.json');

export function getAppVersion(): string {
    if (!isDev()) {
        return remote.app.getVersion();
    }

    return packageJson.version;
}
