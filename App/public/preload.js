const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  checkVnev: (arg) => ipcRenderer.send('check-vnev', arg),
  runPython: (arg) => ipcRenderer.send('run-python', arg),
  handleMissingVnev: (callback) => ipcRenderer.on('no-vnev', callback)
})