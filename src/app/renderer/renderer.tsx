import {ipcRenderer} from 'electron';
import {configure} from 'mobx';
import {Provider} from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {getAppVersion} from '../shared/version';
import {closeProject} from './actions/project/closeProject';
import {openProject} from './actions/project/openProject';
import {reopenLastProject} from './actions/project/reopenLastProject';
import {loadGlobalSettings} from './actions/settings/loadGlobalSettings';
import {toggleSettingInlineForms} from './actions/settings/toggleSettingInlineForms';
import {App} from './components/app/App';
import {states} from './container';
import {rememberSchemaTreeCollapsedState} from './reactions/rememberSchemaTreeCollapsedState';

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
loadGlobalSettings();

// install mobx reactions
rememberSchemaTreeCollapsedState();

ReactDOM.render(
    <Provider {...states}>
        <App appVersion={getAppVersion()}/>
    </Provider>,
    document.getElementById('app'),
);
