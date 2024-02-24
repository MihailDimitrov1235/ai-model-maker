const { ipcMain, dialog, shell } = require('electron');
const { setupIPCMainPyEnv } = require('./pyEnvHandlers');
const { setupIPCDatasets } = require('./datasetHandlers');
const { setupIPCModelHandlers } = require('./modelHandlers');
const { getConfig, setConfig } = require('../utils/configUtils');
const { default: setupIPCUseHandlers } = require('./useHandlers');

function setupIPCMain(win) {
  ipcMain.setMaxListeners(20);
  setupIPCMainPyEnv(win);
  setupIPCDatasets(win);
  setupIPCModelHandlers(win);
  setupIPCUseHandlers(win);

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
  ipcMain.handle('get-config', async (event, arg) => {
    return getConfig();
  });

  ipcMain.handle('select-python-exe', async (event, arg) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      filters: [{ name: 'Python Executable', extensions: ['exe'] }],
    });
    return { canceled: canceled, filePaths: filePaths };
  });

  ipcMain.handle('change-config', async (event, arg) => {
    setConfig(arg);
    return;
  });

  ipcMain.handle('open-url', async (event, arg) => {
    shell.openExternal(arg);
  });
}

module.exports = { setupIPCMain };
