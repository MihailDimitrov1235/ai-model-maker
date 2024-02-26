const { ipcMain, dialog } = require('electron');
const { getAssetPath } = require('../../utils');
import { getConfig } from '../../utils/configUtils';
const { PythonShell } = require('python-shell');
const fs = require('fs');
const path = require('path');
let pyShell;
let modelReady = false;

function setupIPCUseHandlers(win) {
  ipcMain.handle('prepare-table-model-for-use', async (event, arg) => {
    modelReady = false;
    if (pyShell) {
      pyShell.kill('SIGINT');
    }
    const config = getConfig();
    if (!config.python_exe_path) {
      win.webContents.send('create-snackbar', {
        message: 'no-python-message',
        title: 'no-python-title',
        alertVariant: 'error',
        autoHideDuration: 3000,
        // persist: true,
        buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
      });
      win.webContents.send('close-training-dialog');
      return false;
    }
    let options = {
      mode: 'text',
      pythonPath: config.python_exe_path,
      pythonOptions: ['-u'],
      scriptPath: getAssetPath('/python-scripts/tabularData'),
      args: [
        getAssetPath(`/models/table/${arg}/model.keras`),
        getAssetPath(`/models/table/${arg}/ckpt/checkpoint`),
      ],
    };

    pyShell = new PythonShell('use_model.py', options);

    pyShell.stdout.on('data', function (message) {
      try {
        const jsonData = JSON.parse(message.trim());
        console.log(jsonData);
        if (jsonData['type'] == 'result') {
          win.webContents.send('set-test-result', jsonData['predictions']);
        }
      } catch (e) {
        if (message.includes('model loaded')) {
          modelReady = true;
        }
      }
    });

    pyShell.stderr.on('data', function (err) {
      console.log('Python error');
      console.log(err);
      if (err.includes('Error')) {
        modelReady = false;
        win.webContents.send('create-snackbar', {
          message: 'python-error-message',
          title: 'python-error-title',
          alertVariant: 'error',
          autoHideDuration: 3000,
          // persist: true,
          buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
        });
      }
    });
    pyShell.on('close', (code, signal) => {});
  });

  ipcMain.handle('test-table-model', async (event, arg) => {
    if (modelReady) {
      pyShell.stdin.write(JSON.stringify({ type: 'test', data: arg }) + '\n');
    } else {
      win.webContents.send('create-snackbar', {
        message: 'model-not-yet-loaded-message',
        title: 'model-not-yet-loaded-title',
        alertVariant: 'error',
        autoHideDuration: 3000,
        // persist: true,
        // buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
      });
    }
  });
  ipcMain.handle('save-model', async (event, arg) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    if (canceled) {
      return;
    }
    if (modelReady) {
      pyShell.stdin.write(
        JSON.stringify({
          type: 'download',
          path: path.join(filePaths[0], 'model.keras'),
        }) + '\n',
      );
      win.webContents.send('create-snackbar', {
        message: 'model-download-started-message',
        title: 'model-download-started-title',
        alertVariant: 'info',
        autoHideDuration: 3000,
        // persist: true,
        // buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
      });
    } else {
      win.webContents.send('create-snackbar', {
        message: 'model-not-yet-loaded-message',
        title: 'model-not-yet-loaded-title',
        alertVariant: 'error',
        autoHideDuration: 3000,
        // persist: true,
        // buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
      });
    }
  });
}
export default setupIPCUseHandlers;
