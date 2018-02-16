import {isDev} from '@/functions/infrastructure/env';
import {remote} from 'electron';

const packageJson: any = require('../../../../package.json');

export function getAppVersion(): string {
    if (!isDev()) {
        return remote.app.getVersion();
    }

    return packageJson.version;
}
