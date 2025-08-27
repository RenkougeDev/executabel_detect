const {contextBridge, ipcRenderer} = require('electron');
contextBridge.exposeInMainWorld(
    'api', {
        onCppOutput: (callback) => ipcRenderer.on('cpp-history-output', (event, data) => callback(data)),
        printToTerminal: (item) => ipcRenderer.send('toggle-display-channel', item),
        toggleSetting: (settings_name) => ipcRenderer.send('toggle-setting', settings_name),
        toggleInformationReceived: (callback) => ipcRenderer.on('toggle-information-received', (event, database) => callback(database)),
        openHistoryWindow: () => ipcRenderer.send('open-history-window'),
        historyDatabaseOutput: (callback) => ipcRenderer.on('executable-add-history', (event, data) => callback(data))
    },
);