import {injectable} from 'inversify';
import {action, observable} from 'mobx';
import {Project} from './objects/Project';

@injectable()
export class ProjectState {
    @observable private _project: Project | null   = null;
    @observable private _isLoading: boolean        = false;
    @observable private _fileContentSearchText: string = '';
    @observable private _error: any                = null;

    get fileContentSearchText(): string {
        return this._fileContentSearchText;
    }

    @action
    setFileContentSearchText(text: string): void {
        this._fileContentSearchText = text;
    }

    @action
    setLoading(): void {
        this._isLoading = true;
        this._error     = null;
        this._project   = null;
    }

    @action
    setLoaded(project: Project): void {
        this._isLoading = false;
        this._error     = null;
        this._project   = project;
    }

    @action
    setError(error: any): void {
        this._isLoading = false;
        this._error     = error;
        this._project   = null;
    }

    @action
    setClosed(): void {
        this._isLoading = false;
        this._error     = null;
        this._project   = null;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get error(): any {
        return this._error;
    }

    get project(): Project {
        if (!this._project) {
            throw new Error('tried to access current project, but no project was loaded');
        }
        return this._project;
    }

    get hasProject(): boolean {
        return !!this._project;
    }
}
