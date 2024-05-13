import {injectable} from 'inversify';
import {ProjectState} from '../../states/ProjectState';

@injectable()
export class SearchForFileContent {

    constructor(
        private projectState: ProjectState,
    ) {
    }

    execute(text: string): Promise<void> {
        this.projectState.setFileContentSearchText(text);
        return Promise.resolve();
    }
}