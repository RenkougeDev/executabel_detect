import { BrowserWindow, app, screen, ipcMain } from "electron";
import { spawn } from 'child_process';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from "url";
let mainWindow;
let cppProcess = null;
let settingsProcess = null;
let databaseView = null;
let lineBuffer = '';
let width = null;
let height = null;
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function createHistoryWindow(){
    let displayPrimary = screen.getPrimaryDisplay();
    const __dirname = dirname(fileURLToPath(import.meta.url));
    var mainWindow = new BrowserWindow({ // set window configuration
        width: width,
        height: height,
        x: displayPrimary.size.width - (width - 3), // set initialize x position of window
        y: (displayPrimary.size.height / 2) - (height), // set initialize y position of window
        webPreferences: {
            preload: path.join(__dirname, "..", "..", 'src', 'preload', 'preload.js'),
            contextIsolation: true,
            nodeIntegration: true
        },
        alwaysOnTop: true,
        // toggle if in debug mode
            frame: false,
            transparent: true,
            focusable: false,
        // end toggle if in debug mode
        autoHideMenuBar: true,
        skipTaskbar: true,
        resizable: true,
        movable: true,
        backgroundColor: 'rgba(0, 0, 0, 0)'
    });
    mainWindow.setTitle("");
    mainWindow.loadFile("src/view_database_renderer/index.html");
    mainWindow.show();
    await sleep(1000);
    settingsProcess = spawn(path.resolve(__dirname, "..", "..", "backend", "config_handler", "config_handler.exe"));
    settingsProcess.stdout.on('data', (data) => {
        lineBuffer += data.toString();
        while(lineBuffer.includes("\n")) {
            const newlineIndex = lineBuffer.indexOf("\n");
            const line = lineBuffer.substring(0, newlineIndex).trim();
            lineBuffer = lineBuffer.substring(newlineIndex + 1);
            const separated = line.split(" | ");
            if(separated[0] == "out"){
                mainWindow.webContents.send('toggle-information-received', separated[1]);
            }
        }
    });
    databaseView = spawn(path.resolve(__dirname, "..", "..", "backend", "executable_added_history.exe"));
    databaseView.stdout.on('data', (data) => {
        lineBuffer += data.toString();
        const lines = lineBuffer.split(/\r?\n/);
        lineBuffer = lines.pop(); // delete the last null value
        // console.log(data.toString().trim());
        if(mainWindow && !mainWindow.isDestroyed()){
            lines.forEach(line => {
                const data = line.trim();
                if(data.length > 0){
                    // async IPC communication
                    mainWindow.webContents.send('executable-add-history', data); // send to renderer process
                }
            })
        }
    });
}
async function createWindow(){
    let displayPrimary = screen.getPrimaryDisplay();
    width = displayPrimary.size.width / 4;
    height = 200;
    const __dirname = dirname(fileURLToPath(import.meta.url));
    var mainWindow = new BrowserWindow({ // set window configuration
        width: width,
        height: height,
        x: displayPrimary.size.width - (width - 3), // set initialize x position of window
        y: (displayPrimary.size.height / 2) + (height / 4), // set initialize y position of window
        webPreferences: {
            preload: path.join(__dirname, "..", "..", 'src', 'preload', 'preload.js'),
            contextIsolation: true,
            nodeIntegration: true
        },
        alwaysOnTop: true,
        // toggle if in debug mode
            frame: false,
            transparent: true,
            focusable: false,
        // end toggle if in debug mode
        autoHideMenuBar: true,
        skipTaskbar: true,
        resizable: true,
        movable: true,
        backgroundColor: 'rgba(0, 0, 0, 0)'
        // vibrancy: 'acrylic'
    });
    // mainWindow.setIgnoreMouseEvents(true, {forward: true});
    // mainWindow.setBackgroundMaterial("acrylic");
    // mainWindow.setMenuBarVisibility()
    mainWindow.setTitle('');
    mainWindow.loadFile("src/renderer/index.html");
    // mainWindow.setWindowButtonVisibility(false);
    await sleep(1000);
    settingsProcess = spawn(path.resolve(__dirname, "..", "..", "backend", "config_handler", "config_handler.exe"));
    settingsProcess.stdout.on('data', (data) => {
        lineBuffer += data.toString();
        while(lineBuffer.includes("\n")) {
            const newlineIndex = lineBuffer.indexOf("\n");
            const line = lineBuffer.substring(0, newlineIndex).trim();
            lineBuffer = lineBuffer.substring(newlineIndex + 1);
            const separated = line.split(" | ");
            // console.log(separated);
            if(separated[0] == "out"){
                // console.log(separated[1]);
                mainWindow.webContents.send('toggle-information-received', separated[1]);
            }
        }
    });
    cppProcess = spawn(path.resolve(__dirname, "..", "..", "backend", "executable_name_history.exe"));
    cppProcess.stdout.on('data', (data) => { // IPC Standard I/O (this using pipe)
        lineBuffer += data.toString();
        const lines = lineBuffer.split(/\r?\n/);
        lineBuffer = lines.pop(); // delete the last null value
        // console.log(data.toString().trim());
        if(mainWindow && !mainWindow.isDestroyed()){
            lines.forEach(line => {
                const data = line.trim();
                if(data.length > 0){
                    // async IPC communication
                    mainWindow.webContents.send('cpp-history-output', data); // send to renderer process
                }
            })
        }
    })
    ipcMain.on('toggle-display-channel', (event, item) => {
        console.log(item);
    });
    ipcMain.on('open-history-window', () => {
        createHistoryWindow();
    })
    ipcMain.on('open-setting-window', () => {
        // const settingWindow = new BrowserWindow({ // set window configuration
        //     width: 400,
        //     height: 300,
        //     // x: displayPrimary.size.width - (width - 3), // set initialize x position of window
        //     // y: (displayPrimary.size.height / 2) + (height / 4), // set initialize y position of window
        //     webPreferences: {
        //         preload: path.join(__dirname, "..", "..", 'src', 'preload', 'preload.js'),
        //         contextIsolation: true,
        //         nodeIntegration: false
        //     },
        //     alwaysOnTop: true,
        //     // frame: false,
        //     autoHideMenuBar: true,
        //     // transparent: true,
        //     // focusable: false,
        //     skipTaskbar: true,
        //     resizable: true,
        //     movable: true
        // });
        // settingWindow.setTitle('');
        // settingWindow.loadFile("src/renderer/settings/index.html");
        // settingWindow.once('ready-to-show', () => {
        //     settingWindow.show();
        // });
        // settingWindow.on('blur', () => {
        //     if(mainWindow && !mainWindow.isDestroyed()){
        //         mainWindow.setFocusable(false);
        //     }
        // });
        // settingWindow.on('closed', () => {
        //     if(mainWindow && !mainWindow.isDestroyed()){
        //         mainWindow.setFocusable(false);
        //     }
        // });
    });
    ipcMain.on('toggle-setting', (event, settings_name) => {
        // console.log(settings_name);`
        if(settingsProcess){
            settingsProcess.stdin.write(`${settings_name}\n`);
        }
    });
    // mainWindow.on('ready-to-show', () => {
    // });
    setInterval(() => {
        // mainWindow.blur();
        // mainWindow.show();
        // mainWindow.setAlwaysOnTop(true);
        // mainWindow.setFocusable(true)
    }, 1000);
    setInterval(() => {
        // mainWindow.focus();
    }, 2000);
}
app.whenReady().then(()=>{
    createWindow();
})