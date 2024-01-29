const { ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { setupIPCMainPyEnv } = require('./pyEnvHandlers');
const { setupIPCDatasets } = require('./datasetHandlers');
const { setupIPCModelHandlers } = require('./modelHandlers');
const XLSX = require('xlsx');
const { parse } = require('csv-parse/sync');
const { getAssetPath } = require('../utils');

function setupIPCMain(win) {
  ipcMain.setMaxListeners(20);
  setupIPCMainPyEnv(win);
  setupIPCDatasets(win);
  setupIPCModelHandlers(win);

  ipcMain.on('run-python', (event, arg) => {
    // const dial = dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
    // dial.then(data => {
    //   console.log(data)
    // })
    // getConfig();
    // let options = {
    //   mode: 'text',
    //   pythonPath: path.join(__dirname, '/../Python/.conda/python.exe'),
    //   pythonOptions: ['-u'], // get print results in real-time
    //   scriptPath: path.join(__dirname, '/../Python'),
    //   args: []
    // };
    // PythonShell.run('Test.py', options).then(messages=>{
    //   // results is an array consisting of messages collected during execution
    //   console.log('results: %j', messages);
    // });
  });
}

module.exports = { setupIPCMain };
