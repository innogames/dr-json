import {ProjectState} from '../../states/ProjectState';
import {injectable} from 'inversify';

@injectable()
export class SelectFilter {

    constructor(
        private projectState: ProjectState,
    ) {
    }

    execute(filter: string): Promise<void> {
        this.projectState.project.setFilter(filter);

        return Promise.resolve();
    }
}