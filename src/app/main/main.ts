import {app, BrowserWindow, dialog, Event, ipcMain, Menu, shell} from 'electron';
import {errorToString} from '../../domain/helpers/errorToString';
import {GlobalSettings} from '../../domain/states/objects/settings/GlobalSettings';
import {isDev, isMacOS} from '../shared/environment';
import {packageJson} from '../shared/package';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import WebContents = Electron.WebContents;
import IpcMainEvent = Electron.IpcMainEvent;

const remoteMain = require('@electron/remote/main');
remoteMain.initialize()

const Store = require('electron-store');
const store = new Store();

let win: BrowserWindow | null;
const isDevelopment = isDev();

process.on('uncaughtException', handleError);
process.on('unhandledRejection', handleError);

function createWindow() {
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    remoteMain.enable(win.webContents)
    const url: string = isDevelopment
        ? `http://localhost:3000`
        : `file://${__dirname}/index.html`;

    win.loadURL(url);

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    if (isDevelopment) {
        win.webContents.openDevTools();
    }

    createMenu();
}

function createMenu() {
    const globalSettings: GlobalSettings = store.get('globalSettings') || {
        inlineForms: false,
    };

    let template: MenuItemConstructorOptions[] = [
        {
            label:   'File',
            submenu: [
                {
                    label: 'Open Project',
                    click: function () {
                        if (win) {
                            openSelectProjectDialog(win.webContents);
                        }
                    },
                },
                {
                    label: 'Close Project',
                    click: function () {
                        if (win) {
                            win.webContents.send('close-project');
                        }
                    },
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Export Rewards',
                    click: function (): void {
                        if(win) {
                            onExportRewards(win.webContents);
                        }
                    },
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Quit',
                    role:  'quit',
                },
            ],
        },
    ];

    if (isDevelopment) {
        template.push({
            label:   'View',
            submenu: [
                {role: 'reload'},
                {role: 'forceReload'},
                {role: 'toggleDevTools'},
                {type: 'separator'},
                {role: 'resetZoom'},
                {role: 'zoomIn'},
                {role: 'zoomOut'},
                {type: 'separator'},
                {role: 'togglefullscreen'},
            ],
        });
    }

    template.push({
        label:   'Settings',
        submenu: [
            {
                label:   'Inline Forms',
                type:    'checkbox',
                checked: globalSettings.inlineForms,
                click:   function () {
                    if (win) {
                        win.webContents.send('toggle-settings-inlineForms');
                    }
                },
            },
            {type: 'separator'},
            {
                label: 'Open Settings Folder',
                click: function () {
                    shell.showItemInFolder(store.path);
                },
            },
        ],
    });

    template.push({
        role: 'editMenu',
    });

    template.push({
        role:    'window',
        submenu: [
            {role: 'minimize'},
            {role: 'close'},
        ],
    });

    if (isMacOS() && template[0] && template[0].submenu) {
        let submenus = (template[0].submenu as MenuItemConstructorOptions[]);

        template[0].submenu = [
            {type: 'separator'},
            {role: 'about'},
            ...submenus,
        ];
    }

    template.push({
        label:   'Help',
        submenu: [
            {
                label: 'Open Download Page',
                click: function () {
                    shell.openExternal(packageJson.downloadUrl);
                },
            },
            {
                label: 'Open Documentation',
                click: function () {
                    shell.openExternal(packageJson.documentationUrl);
                },
            },
        ],
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

ipcMain.on('open-select-project-dialog', (event: IpcMainEvent): void => {
    openSelectProjectDialog(event.sender);
});

ipcMain.on('handle-error', (_event: Event, error: any) => {
    handleError(error);
});

ipcMain.handle('getStoreValue', async(_event, key, defaultValue) => {
    let data = await store.get(key);

    return data || defaultValue;
});

ipcMain.handle('setStoreValue', (_event, key, data) => {
    store.set(key, data);
});

function onExportRewards(webContents: WebContents): void {
    dialog.showSaveDialog({
        filters: [
            {name: 'Rewards', extensions: ['csv']},
        ],
    }).then(result => {
        if (result.filePath) {
            webContents.send('rewards-export', result.filePath);
        }
    });
}

function openSelectProjectDialog(webContents: WebContents) {
    dialog.showOpenDialog({
        properties: [
          'openFile'
        ],
        filters: [
            {name: 'Project Files', extensions: ['json']},
        ],
    }).then(result => {
        if (result.filePaths) {
            webContents.send('project-selected', result.filePaths[0]);
        }
    });
}

function handleError(error: any): void {
    dialog.showErrorBox(
        'Oh no! Something unexpected happened :(',
        `Please report this to a Dr. Json developer:\n\n${errorToString(error)}`,
    );
}
