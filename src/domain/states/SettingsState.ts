import {action, observable} from 'mobx';

export class SettingsState {
    @observable private _inlineForms: boolean    = false;
    @observable private _collapsedDirs: string[] = [];

    get inlineForms(): boolean {
        return this._inlineForms;
    };

    get collapsedDirs(): string[] {
        return this._collapsedDirs;
    };

    @action
    toggleInlineForms() {
        this._inlineForms = !this._inlineForms;
    }

    @action
    setCollapsedDirs(dirs: string[]) {
        this._collapsedDirs = dirs;
    }
}
