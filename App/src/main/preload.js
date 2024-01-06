const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  checkEnv: (arg) => ipcRenderer.send('check-env', arg),
  createEnv: (arg) => ipcRenderer.send('create-env', arg),
  cancelCreateEnv: (arg) => ipcRenderer.send('cancel-create-env', arg),
  selectTabularFile: (arg) => ipcRenderer.send('select-tabular-file', arg),
  selectImageFolder: (arg) => ipcRenderer.send('select-image-folder', arg),
  selectLabel: (arg) => ipcRenderer.send('select-label', arg),
  runPython: (arg) => ipcRenderer.send('run-python', arg),
  handleMissingVenv: (callback) => ipcRenderer.on('no-env', callback),
  handleMissingConda: (callback) => ipcRenderer.on('no-conda', callback),
  handleChangeCreateEnvText: (callback) =>
    ipcRenderer.on('change-create-env-text', callback),
  handleCloseCreateEnv: (callback) =>
    ipcRenderer.on('close-create-env', callback),
  handleSetTabularFile: (callback) =>
    ipcRenderer.on('set-tabular-file', callback),
  handleSetTabularFileData: (callback) =>
    ipcRenderer.on('set-tabular-file-data', callback),
  handleSetImageFolder: (callback) =>
    ipcRenderer.on('set-image-folder', callback),
  handleSetImageLabel: (callback) =>
    ipcRenderer.on('set-image-label', callback),
});
