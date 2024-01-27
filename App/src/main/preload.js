const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  checkEnv: (arg) => ipcRenderer.send('check-env', arg),
  createEnv: (arg) => ipcRenderer.send('create-env', arg),
  cancelCreateEnv: (arg) => ipcRenderer.send('cancel-create-env', arg),
  selectTabularFile: (arg) => ipcRenderer.send('select-tabular-file', arg),
  selectImageFolder: (arg) => ipcRenderer.send('select-image-folder', arg),
  selectLabel: (arg) => ipcRenderer.send('select-label', arg),
  createDatasetTable: (arg) => ipcRenderer.send('create-dataset-table', arg),
  createDatasetLabels: (arg) => ipcRenderer.send('create-dataset-labels', arg),
  runPython: (arg) => ipcRenderer.send('run-python', arg),
  requestImage: (arg) => ipcRenderer.send('requestImage', arg),
  requestDatasetsInfo: (arg) => ipcRenderer.send('requestDatasetsInfo', arg),
  getDatasetsCount: (arg) => ipcRenderer.send('get-datasets-count', arg),

  getTabularDatasets: (arg) => ipcRenderer.invoke('get-tabular-datasets', arg),
  getImageDatasets: (arg) => ipcRenderer.invoke('get-image-datasets', arg),
  getDatasetInfo: (arg) => ipcRenderer.invoke('get-dataset-info', arg),

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
  handleRequestImage: (callback) =>
    ipcRenderer.on('set-request-image', callback),
  handleRequestDatasetsInfo: (callback) =>
    ipcRenderer.on('set-request-datasets-info', callback),
  handleSetDatasetsCount: (callback) =>
    ipcRenderer.on('set-datasets-count', callback),
});
