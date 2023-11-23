const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  runPython: (arg) => ipcRenderer.send('run-python', arg)
})