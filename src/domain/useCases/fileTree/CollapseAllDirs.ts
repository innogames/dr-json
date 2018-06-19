import {injectable} from 'inversify';
import {SchemaDir} from '../../states/objects/fileTree/SchemaDir';
import {ProjectState} from '../../states/ProjectState';

@injectable()
export class CollapseAllDirs {

    constructor(
        private projectState: ProjectState,
    ) {
    }

    execute(): Promise<void> {
        this.projectState.project.schemaTree.forEachDir((dir: SchemaDir) => {
            dir.setCollapsed(true);
        });

        return Promise.resolve();
    }
}