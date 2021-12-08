import {isDev} from './environment';
import {packageJson} from './package';

export function getAppVersion(): string {
    if (!isDev()) {
        return process.env.npm_package_version || packageJson.version;
    }

    return packageJson.version;
}
