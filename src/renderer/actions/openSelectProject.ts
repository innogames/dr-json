import {ipcRenderer} from 'electron';

export function openSelectProject() {
    ipcRenderer.send('open-select-project-dialog');
}