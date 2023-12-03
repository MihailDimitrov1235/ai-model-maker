const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  checkVenv: (arg) => ipcRenderer.send('check-venv', arg),
  createVenv: (arg) =>ipcRenderer.send('create-venv', arg),
  runPython: (arg) => ipcRenderer.send('run-python', arg),
  handleMissingVenv: (callback) => ipcRenderer.on('no-vnev', callback)
})