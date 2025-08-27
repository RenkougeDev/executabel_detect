const {contextBridge, ipcRenderer} = require('electron');
contextBridge.exposeInMainWorld(
    'api', {
        onCppOutput: (callback) => ipcRenderer.on('cpp-output', (event, data) => callback(data)),
        toggleDisplay: (item) => ipcRenderer.send('toggle-display-channel', item),
        openSettingWindow: () => ipcRenderer.send('open-setting-window')
    },
);