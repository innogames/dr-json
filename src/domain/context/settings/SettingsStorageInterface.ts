export const SettingsStorageId: symbol = Symbol();

export interface SettingsStorageInterface {
    load<R>(name: string, defaultValue: R): R;

    save(name: string, value: any): void;
}