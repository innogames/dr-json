import {ipcRenderer} from 'electron';
import {configure} from 'mobx';
import {Provider} from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'reflect-metadata';
import {errorToString} from '../../domain/helpers/errorToString';
import {EditorState} from '../../domain/states/EditorState';
import {ProjectState} from '../../domain/states/ProjectState';
import {SettingsState} from '../../domain/states/SettingsState';
import {getAppVersion} from '../shared/version';
import {closeProject} from './actions/project/closeProject';
import {openProject} from './actions/project/openProject';
import {reopenLastProject} from './actions/project/reopenLastProject';
import {loadGlobalSettings} from './actions/settings/loadGlobalSettings';
import {toggleSettingInlineForms} from './actions/settings/toggleSettingInlineForms';
import {App} from './components/app/App';
import {container} from './container';
import {rememberSchemaTreeCollapsedState} from './reactions/rememberSchemaTreeCollapsedState';
import {rememberRewardFilesState} from "./reactions/rememberRewardFilesState";
import {exportRewards} from "./actions/project/exportRewards";

window.addEventListener('error', (event: ErrorEvent): void => {
    ipcRenderer.send('handle-error', errorToString(event.error));
});
window.addEventListener('unhandledrejection', (event: Event): void => {
    ipcRenderer.send('handle-error', errorToString((event as PromiseRejectionEvent).reason));
});

configure({
    enforceActions: "never",
});

ipcRenderer.on('rewards-export', (_event: any, path: string): void => {
    exportRewards(path);
});

ipcRenderer.on('project-selected', (_event: any, path: string): void => {
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
rememberRewardFilesState();

const states: any = {
    editorState:   container.get(EditorState),
    projectState:  container.get(ProjectState),
    settingsState: container.get(SettingsState),
};

ReactDOM.render(
    <Provider {...states}>
        <App appVersion={getAppVersion()}/>
    </Provider>,
    document.getElementById('app'),
);
