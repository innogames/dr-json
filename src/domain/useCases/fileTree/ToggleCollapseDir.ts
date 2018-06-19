import {injectable} from 'inversify';
import {SchemaDir} from '../../states/objects/fileTree/SchemaDir';
import {ProjectState} from '../../states/ProjectState';

@injectable()
export class ToggleCollapseDir {

    constructor(
        private projectState: ProjectState,
    ) {
    }

    execute(basename: string): Promise<void> {
        if (!this.projectState.project.schemaPath) {
            return Promise.reject('No open file');
        }

        this.projectState.project.schemaTree.forEachDir((dir: SchemaDir) => {
            if (dir.basename == basename) {
                dir.setCollapsed(!dir.collapsed);
            }
        });

        return Promise.resolve();
    }
}