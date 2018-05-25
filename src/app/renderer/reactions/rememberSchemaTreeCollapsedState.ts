import {reaction} from 'mobx';
import {SchemaDir} from '../../../domain/states/objects/fileTree/SchemaDir';
import {ProjectState} from '../../../domain/states/ProjectState';
import {changeSettingCollapsedDirs} from '../actions/settings/changeSettingCollapsedDirs';
import {container} from '../container';

// remember the collapsed state of folders in the folder tree, so the states will be the same
// after closing and opening the application again.
const projectState: ProjectState = container.get(ProjectState);

export function rememberSchemaTreeCollapsedState() {
    reaction(
        () => {
            if (!projectState.hasProject) {
                return null;
            }

            let collapsed: string[] = [];

            projectState.project.schemaTree.forEachDir((dir: SchemaDir) => {
                if (dir.collapsed) {
                    collapsed.push(dir.basename);
                }
            });

            return collapsed;
        },
        (collapsedDirs: string[] | null) => {
            if (collapsedDirs != null) {
                changeSettingCollapsedDirs(collapsedDirs);
            }
        },
        {
            delay: 1000,
        },
    );
}

