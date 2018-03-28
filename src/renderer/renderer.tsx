import {ipcRenderer} from 'electron';
import {configure} from 'mobx';
import {Provider} from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {getAppVersion} from '../shared/app/version';
import {closeProject} from './actions/closeProject';
import {openProject} from './actions/openProject';
import {App} from './components/app/App';
import {stores} from './stores';

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
    stores.settingsStore.toggleInlineForms();
});

if (stores.settingsStore.projectFile) {
    openProject(stores.settingsStore.projectFile);
}

ReactDOM.render(
    <Provider {...stores}>
        <App appVersion={getAppVersion()}/>
    </Provider>,
    document.getElementById('app'),
);
