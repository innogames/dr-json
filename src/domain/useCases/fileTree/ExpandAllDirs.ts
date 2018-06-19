import {injectable} from 'inversify';
import {SchemaDir} from '../../states/objects/fileTree/SchemaDir';
import {ProjectState} from '../../states/ProjectState';

@injectable()
export class ExpandAllDirs {

    constructor(
        private projectState: ProjectState,
    ) {
    }

    execute(): Promise<void> {
        this.projectState.project.schemaTree.forEachDir((dir: SchemaDir) => {
            dir.setCollapsed(false);
        });

        return Promise.resolve();
    }
}