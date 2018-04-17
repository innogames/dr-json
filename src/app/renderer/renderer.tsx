import {ipcRenderer} from 'electron';
import {configure, reaction} from 'mobx';
import {Provider} from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {SchemaDir} from '../../domain/states/objects/fileTree/SchemaDir';
import {getAppVersion} from '../shared/version';
import {closeProject} from './actions/project/closeProject';
import {openProject} from './actions/project/openProject';
import {reopenLastProject} from './actions/project/reopenLastProject';
import {changeSettingCollapsedDirs} from './actions/settings/changeSettingCollapsedDirs';
import {toggleSettingInlineForms} from './actions/settings/toggleSettingInlineForms';
import {App} from './components/app/App';
import {states} from './container';

configure({
    enforceActions: true,
});

ipcRenderer.on('project-selected', (_event: any, path: string) => {
    openProject(path);
});

ipcRenderer.on('close-project', () => {
    closeProject();
});

ipcRenderer.on('toggle-settings-inlineForms', () => {
    toggleSettingInlineForms();
});

// try to open last project
reopenLastProject();

// remember the collapsed state of folders in the folder tree, so the states will be the same
// after closing and opening the application again.
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


ReactDOM.render(
    <Provider {...states}>
        <App appVersion={getAppVersion()}/>
    </Provider>,
    document.getElementById('app'),
);
