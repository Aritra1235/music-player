const { app, ipcMain, dialog } = require('electron');
const { MicaBrowserWindow } = require('mica-electron');
const fs = require('fs');
const path = require('path');

// Function to recursively read files
const getMusicFilesRecursively = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            getMusicFilesRecursively(filePath, fileList);
        } else if (file.endsWith('.mp3') || file.endsWith('.wav') || file.endsWith('.flac')) {
            fileList.push(filePath);
        }
    });

    return fileList;
};

function createWindow() {
    const win = new MicaBrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        show: false,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.setAutoTheme();   // Same theme as computer
    win.setMicaAcrylicEffect(); // Acrylic for windows 11
    win.setRoundedCorner()

    win.loadFile('index.html');

    win.webContents.once('dom-ready', () => {
        win.show();
    });

    // Handle window control events
    ipcMain.on('window-minimize', () => win.minimize());
    ipcMain.on('window-maximize', () => {
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    });
    ipcMain.on('window-close', () => win.close());
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.handle('dialog:openFolder', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            properties: ['openDirectory']
        });

        if (canceled) {
            return null;
        } else {
            const folderPath = filePaths[0];
            const musicFiles = getMusicFilesRecursively(folderPath);
            return musicFiles;
        }
    });

    app.on('activate', () => {
        if (MicaBrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});