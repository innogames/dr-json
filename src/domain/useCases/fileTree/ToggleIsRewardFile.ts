import {injectable} from 'inversify';
import {ProjectState} from '../../states/ProjectState';
import {SchemaFile} from "../../states/objects/fileTree/SchemaFile";

@injectable()
export class ToggleIsRewardFile {

    constructor(
        private projectState: ProjectState,
    ) {
    }

    execute(basename: string): Promise<void> {
        this.projectState.project.schemaTree.forEachFile((file: SchemaFile) => {
            if (file.basename === basename) {
                file.setIsReward(!file.isReward);
            }
        });

        return Promise.resolve();
    }
}