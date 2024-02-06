const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  checkEnv: (arg) => ipcRenderer.send('check-env', arg),
  createEnv: (arg) => ipcRenderer.send('create-env', arg),
  cancelCreateEnv: (arg) => ipcRenderer.send('cancel-create-env', arg),
  createDatasetTable: (arg) => ipcRenderer.send('create-dataset-table', arg),
  createDatasetLabels: (arg) => ipcRenderer.send('create-dataset-labels', arg),
  runPython: (arg) => ipcRenderer.send('run-python', arg),
  createTabularModel: (arg) => ipcRenderer.send('create-tabular-model', arg),

  selectTabularFile: (arg) => ipcRenderer.invoke('select-tabular-file', arg),
  selectImageFolder: (arg) => ipcRenderer.invoke('select-image-folder', arg),
  selectLabel: (arg) => ipcRenderer.invoke('select-label', arg),
  getDatasets: (arg) => ipcRenderer.invoke('get-datasets', arg),
  getDatasetsCount: (arg) => ipcRenderer.invoke('get-datasets-count', arg),
  getTabularDatasets: (arg) => ipcRenderer.invoke('get-tabular-datasets', arg),
  getImageDatasets: (arg) => ipcRenderer.invoke('get-image-datasets', arg),
  getModels: (arg) => ipcRenderer.invoke('get-models', arg),
  getModel: (arg) => ipcRenderer.invoke('get-model', arg),
  trainModel: (arg) => ipcRenderer.invoke('train-model', arg),
  getModelsCount: (arg) => ipcRenderer.invoke('get-models-count', arg),
  getDatasetInfo: (arg) => ipcRenderer.invoke('get-dataset-info', arg),
  getImage: (arg) => ipcRenderer.invoke('get-image', arg),

  handleMissingVenv: (callback) => ipcRenderer.on('no-env', callback),
  handleMissingConda: (callback) => ipcRenderer.on('no-conda', callback),
  handleChangeCreateEnvText: (callback) =>
    ipcRenderer.on('change-create-env-text', callback),
  handleCloseCreateEnv: (callback) =>
    ipcRenderer.on('close-create-env', callback),
});
