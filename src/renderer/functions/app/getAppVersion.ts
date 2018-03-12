import {remote} from 'electron';
import {isDev} from '../../../shared/app/environment';
import {packageJson} from '../../../shared/app/package';

export function getAppVersion(): string {
    if (!isDev()) {
        return remote.app.getVersion();
    }

    return packageJson.version;
}
