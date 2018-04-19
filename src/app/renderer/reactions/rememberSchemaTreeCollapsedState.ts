import {reaction} from 'mobx';
import {SchemaDir} from '../../../domain/states/objects/fileTree/SchemaDir';
import {changeSettingCollapsedDirs} from '../actions/settings/changeSettingCollapsedDirs';
import {states} from '../container';

// remember the collapsed state of folders in the folder tree, so the states will be the same
// after closing and opening the application again.

export function rememberSchemaTreeCollapsedState() {
    reaction(
        () => {
            if (!states.projectState.hasProject) {
                return null;
            }

            let collapsed: string[] = [];

            states.projectState.project.schemaTree.forEachDir((dir: SchemaDir) => {
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

