import {ipcRenderer} from 'electron'
import {injectable} from 'inversify';
import {SettingsStorageInterface} from '../../../domain/context/settings/SettingsStorageInterface';

@injectable()
export class SettingsStorageImpl implements SettingsStorageInterface {
    public load<R>(name: string, defaultValue: R): Promise<R> {
        return ipcRenderer.invoke('getStoreValue', name, defaultValue);
    }

    public save(name: string, value: any): void {
        ipcRenderer.invoke('setStoreValue', name, value);
    }
}
