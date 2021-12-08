export const SettingsStorageId: symbol = Symbol();

export interface SettingsStorageInterface {
    load<R>(name: string, defaultValue: R): Promise<R>;

    save(name: string, value: any): void;
}
