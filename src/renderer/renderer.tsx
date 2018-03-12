import {ipcRenderer} from 'electron';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {closeProject} from './actions/closeProject';
import {openProject} from './actions/openProject';
import {App} from './components/app/App';
import {getAppVersion} from './functions/app/getAppVersion';
import {getDownloadUrl} from './functions/app/getDownloadUrl';
import {openExternal} from './functions/infrastructure/openExternal';
import {stores} from './stores';

useStrict(true);

ipcRenderer.on('project-selected', (_event: any, path: string) => {
    openProject(path);
});

ipcRenderer.on('close-project', () => {
    closeProject();
});

ipcRenderer.on('toggle-settings-inlineForms', () => {
    stores.settingsStore.toggleInlineForms();
});

ipcRenderer.on('open-download-page', () => {
    openExternal(getDownloadUrl());
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
