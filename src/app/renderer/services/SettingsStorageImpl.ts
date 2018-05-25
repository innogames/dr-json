import {injectable} from 'inversify';
import {SettingsStorageInterface} from '../../../domain/context/settings/SettingsStorageInterface';

const electronSettings = require('electron-settings');

@injectable()
export class SettingsStorageImpl implements SettingsStorageInterface {
    public load<R>(name: string, defaultValue: R): R {
        return electronSettings.get(name) || defaultValue;
    }

    public save(name: string, value: any): void {
        electronSettings.set(name, value);
    }

}