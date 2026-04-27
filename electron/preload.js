const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getHardwareInfo: (callback) => ipcRenderer.on('hardware-update', (_event, value) => callback(value)),
  launchOrDownloadApp: (appData) => ipcRenderer.invoke('launch-or-download', appData)
});
