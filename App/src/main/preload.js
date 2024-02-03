const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  checkEnv: (arg) => ipcRenderer.send('check-env', arg),
  createEnv: (arg) => ipcRenderer.send('create-env', arg),
  cancelCreateEnv: (arg) => ipcRenderer.send('cancel-create-env', arg),
  createDatasetTable: (arg) => ipcRenderer.send('create-dataset-table', arg),
  createDatasetLabels: (arg) => ipcRenderer.send('create-dataset-labels', arg),
  runPython: (arg) => ipcRenderer.send('run-python', arg),
  requestImage: (arg) => ipcRenderer.send('request-image', arg),
  requestDatasetsInfo: (arg) => ipcRenderer.send('request-datasets-info', arg),
  getDatasetsCount: (arg) => ipcRenderer.send('get-datasets-count', arg),
  getModels: (arg) => ipcRenderer.send('get-models', arg),
  getModelsCount: (arg) => ipcRenderer.send('get-models-count', arg),
  createTabularModel: (arg) => ipcRenderer.send('create-tabular-model', arg),

  selectTabularFile: (arg) => ipcRenderer.invoke('select-tabular-file', arg),
  selectImageFolder: (arg) => ipcRenderer.invoke('select-image-folder', arg),
  selectLabel: (arg) => ipcRenderer.invoke('select-label', arg),
  getTabularDatasets: (arg) => ipcRenderer.invoke('get-tabular-datasets', arg),
  getImageDatasets: (arg) => ipcRenderer.invoke('get-image-datasets', arg),
  getDatasetInfo: (arg) => ipcRenderer.invoke('get-dataset-info', arg),

  handleMissingVenv: (callback) => ipcRenderer.on('no-env', callback),
  handleMissingConda: (callback) => ipcRenderer.on('no-conda', callback),
  handleChangeCreateEnvText: (callback) =>
    ipcRenderer.on('change-create-env-text', callback),
  handleCloseCreateEnv: (callback) =>
    ipcRenderer.on('close-create-env', callback),
  handleRequestImage: (callback) =>
    ipcRenderer.on('set-request-image', callback),
  handleRequestDatasetsInfo: (callback) =>
    ipcRenderer.on('set-request-datasets-info', callback),
  handleSetDatasetsCount: (callback) =>
    ipcRenderer.on('set-datasets-count', callback),
  handleSetModels: (callback) => ipcRenderer.on('set-models', callback),
  handleSetModelsCount: (callback) =>
    ipcRenderer.on('set-models-count', callback),
});
