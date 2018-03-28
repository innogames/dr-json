import {action, observable} from 'mobx';
import {Project} from '../../../domain/entities/project/Project';

export class ProjectStore {
    @observable private project: Project | null = null;
    @observable isLoading: boolean              = false;
    @observable error: string | null            = null;

    @action
    setLoading(): void {
        this.project   = null;
        this.isLoading = true;
        this.error     = null;
    }

    @action
    set(project: Project): void {
        this.project   = project;
        this.isLoading = false;
        this.error     = null;
    }

    @action
    setError(error: string): void {
        this.isLoading = false;
        this.error     = error;
    }

    @action
    reset(): void {
        this.project   = null;
        this.isLoading = false;
        this.error     = null;
    }

    get current(): Project {
        if (!this.project) {
            throw new Error('tried to access current project, but no project was loaded');
        }
        return this.project;
    }

    get hasCurrent(): boolean {
        return !!this.project;
    }
}

export const projectStore = new ProjectStore();