import {ProjectState} from '../../states/ProjectState';
import {injectable} from 'inversify';

@injectable()
export class ResetFilter {

    constructor(
        private projectState: ProjectState,
    ) {
    }

    execute(): Promise<void> {
        this.projectState.project.setFilter(null);

        return Promise.resolve();
    }
}