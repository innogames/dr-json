const {app, BrowserWindow, ipcMain, dialog, Menu, shell} = require('electron');
const url = require('url');
const path = require('path');
const electronDebug = require('electron-debug');
const electronSettings = require('electron-settings');

let win;
const isDevelopment = process.env.NODE_ENV !== 'production';
const isMacOS = process.platform === 'darwin';

electronDebug({enabled: isDevelopment});

function createWindow() {
    win = new BrowserWindow({width: 1000, height: 800});

    const url = isDevelopment
        ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
        : `file://${__dirname}/index.html`;

    win.loadURL(url);

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    });

    //win.webContents.openDevTools();

    createMenu();
}

function createMenu() {
    let template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open Project',
                    click: function () {
                        openSelectProjectDialog(win.webContents);
                    }
                },
                {
                    label: 'Close Project',
                    click: function () {
                        win.webContents.send('close-project');
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    role: 'quit',
                }
            ]
        }
    ];

    if (isDevelopment) {
        template.push({
            label: 'View',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {role: 'toggledevtools'},
                {type: 'separator'},
                {role: 'resetzoom'},
                {role: 'zoomin'},
                {role: 'zoomout'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        });
    }

    template.push({
        label: 'Settings',
        submenu: [
            {
                label: 'Inline Forms',
                type: 'checkbox',
                checked: electronSettings.get('inlineForms'),
                click: function () {
                    win.webContents.send('toggle-settings-inlineForms');
                }
            },
            {type: 'separator'},
            {
                label: 'Open Settings Folder',
                click: function () {
                    shell.showItemInFolder(electronSettings.file());
                }
            }
        ]
    });

    template.push({
        role: 'editMenu',
    });

    template.push({
        role: 'window',
        submenu: [
            {role: 'minimize'},
            {role: 'close'}
        ]
    });

    if (isMacOS) {
        template[0].submenu.unshift({type: 'separator'});
        template[0].submenu.unshift({role: 'about'});
    }

    template.push({
        label: 'Help',
        submenu: [
            {
                label: 'Open Download Page',
                click: function () {
                    win.webContents.send('open-download-page');
                }
            }
        ]
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});

ipcMain.on('open-select-project-dialog', function (event) {
    openSelectProjectDialog(event.sender);
});

function openSelectProjectDialog(webContents) {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {name: 'Dr Json Project Files', extensions: 'json'}
        ]
    }, function (files) {
        if (files) {
            webContents.send('project-selected', files[0]);
        }
    })
}