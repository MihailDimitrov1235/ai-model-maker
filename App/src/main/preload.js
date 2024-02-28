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
  selectPythonExe: (arg) => ipcRenderer.invoke('select-python-exe', arg),
  selectImageFolder: (arg) => ipcRenderer.invoke('select-image-folder', arg),
  selectLabel: (arg) => ipcRenderer.invoke('select-label', arg),
  getDatasets: (arg) => ipcRenderer.invoke('get-datasets', arg),
  getDatasetsCount: (arg) => ipcRenderer.invoke('get-datasets-count', arg),
  getTabularDatasets: (arg) => ipcRenderer.invoke('get-tabular-datasets', arg),
  getImageDatasets: (arg) => ipcRenderer.invoke('get-image-datasets', arg),
  getModels: (arg) => ipcRenderer.invoke('get-models', arg),
  getModel: (arg) => ipcRenderer.invoke('get-model', arg),
  getTabularModels: (arg) => ipcRenderer.invoke('get-tabular-models', arg),
  getImageModels: (arg) => ipcRenderer.invoke('get-image-models', arg),
  trainModel: (arg) => ipcRenderer.invoke('train-model', arg),
  cancelTraining: (arg) => ipcRenderer.invoke('cancel-train-model', arg),
  getModelsCount: (arg) => ipcRenderer.invoke('get-models-count', arg),
  getDatasetInfo: (arg) => ipcRenderer.invoke('get-dataset-info', arg),
  getImage: (arg) => ipcRenderer.invoke('get-image', arg),
  getConfig: (arg) => ipcRenderer.invoke('get-config', arg),
  changeConfig: (arg) => ipcRenderer.invoke('change-config', arg),
  openUrl: (arg) => ipcRenderer.invoke('open-url', arg),
  prepareTableModelForUse: (arg) =>
    ipcRenderer.invoke('prepare-table-model-for-use', arg),
  testTableModel: (arg) => ipcRenderer.invoke('test-table-model', arg),
  createClassificationModel: (arg) =>
    ipcRenderer.invoke('create-classification-model', arg),
  saveModel: (arg) => ipcRenderer.invoke('save-model', arg),
  deleteDataset: (arg) => ipcRenderer.invoke('delete-dataset', arg),
  deleteModel: (arg) => ipcRenderer.invoke('delete-model', arg),

  handleCreateSnackbar: (callback) =>
    ipcRenderer.on('create-snackbar', callback),
  handleMissingVenv: (callback) => ipcRenderer.on('no-env', callback),
  handleMissingConda: (callback) => ipcRenderer.on('no-conda', callback),
  handleChangeCreateEnvText: (callback) =>
    ipcRenderer.on('change-create-env-text', callback),
  handleCloseCreateEnv: (callback) =>
    ipcRenderer.on('close-create-env', callback),
  handleCloseTrainingDialog: (callback) =>
    ipcRenderer.on('close-training-dialog', callback),
  handleChangeTrainingText: (callback) =>
    ipcRenderer.on('change-training-text', callback),
  handleChangeTrainingProgress: (callback) =>
    ipcRenderer.on('change-training-progress', callback),
  handleCloseCreatingModelDialog: (callback) =>
    ipcRenderer.on('close-creating-model-dialog', callback),
  handleSetTestResult: (callback) =>
    ipcRenderer.on('set-test-result', callback),
  removeListener: (callback) => {
    ipcRenderer.removeAllListeners(callback);
  },
});
