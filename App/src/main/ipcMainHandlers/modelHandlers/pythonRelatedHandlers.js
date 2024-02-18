const { ipcMain } = require('electron');
const { getAssetPath } = require('../../utils');
import { getConfig } from '../../utils/configUtils';
const { PythonShell } = require('python-shell');

const fs = require('fs');

const path = require('path');

let pyShell;
let cancelTraining = false;

export function pythonRelatedHandlers(win) {
  ipcMain.on('create-tabular-model', (event, arg) => {
    if (pyShell) {
      pyShell.kill('SIGINT');
    }
    let error = false;
    const save_model_path = getAssetPath('models/table/' + arg.name);
    if (!fs.existsSync(save_model_path)) {
      fs.mkdirSync(save_model_path, { recursive: true });
    }
    const argsObject = {
      folder_path: getAssetPath('datasets/table/' + arg.dataset),
      save_model_path: save_model_path + '/model.keras',
      learning_rate: arg.learningRate,
      epochs: arg.epochs,
      batch_size: arg.batchSize,
      target: arg.target,
      validation_split: arg.dataSplit[1],
      test_split: arg.dataSplit[2],
    };
    const infoData = {
      name: arg.name,
      dataset: arg.dataset,
      learning_rate: arg.learningRate,
      epochs: arg.epochs,
      batch_size: arg.batchSize,
      target: arg.target,
      validation_split: arg.dataSplit[1],
      test_split: arg.dataSplit[2],
      layers: arg.layers,
      accuracy: 0,
      epochs: [],
    };
    const jsonFilePath = save_model_path + '/info.json';

    let argsArray = [];
    for (let key in argsObject) {
      argsArray.push(argsObject[key]);
    }

    arg.layers.forEach((layer) => {
      argsArray.push(JSON.stringify(layer));
    });

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
      win.webContents.send('close-creating-model-dialog', { error: true });
      return false;
    }
    let options = {
      mode: 'text',
      pythonPath: config.python_exe_path,
      pythonOptions: ['-u'],
      scriptPath: getAssetPath('/python-scripts/tabularData'),
      args: argsArray,
    };

    pyShell = new PythonShell('init_model.py', options);

    pyShell.stdout.on('data', function (message) {
      console.log(message);
    });

    pyShell.stderr.on('data', function (err) {
      if (!err.toLowerCase().includes('warning') && err.includes('Error')) {
        console.log('Python error:');
        console.log(err);
        error = true;
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

    pyShell.on('close', (code, signal) => {
      if (!error) {
        try {
          fs.writeFileSync(
            jsonFilePath,
            JSON.stringify(infoData, null, 2),
            'utf-8',
          );
        } catch (err) {
          win.webContents.send('create-snackbar', {
            message: 'create-file-error-message',
            title: 'create-file-error-title',
            alertVariant: 'error',
            autoHideDuration: 3000,
            // persist: true,
            // buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
          });
        }
        win.webContents.send('create-snackbar', {
          message: 'model-created-message',
          title: 'model-created-title',
          alertVariant: 'success',
          autoHideDuration: 3000,
          // persist: true,
          // buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
        });
      } else {
        fs.rmdirSync(save_model_path);
      }

      win.webContents.send('close-creating-model-dialog', { error: error });
    });
  });

  ipcMain.handle('cancel-train-model', async (event, data) => {
    cancelTraining = true;
  });

  ipcMain.handle('train-model', async (event, data) => {
    cancelTraining = false;
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
    if (data.type == 'table') {
      let eps = [];
      let acc = 0;

      const folder_path = path.join(
        getAssetPath(`datasets/table`),
        data.dataset,
      );
      const model_path = path.join(getAssetPath(`models/table`), data.model);

      const args = [
        folder_path,
        path.join(model_path, 'model.keras'),
        path.join(model_path, 'ckpt', 'checkpoint'),
        data.learning_rate,
        data.epochs,
        data.initial_epoch,
        data.batch_size,
        data.target,
        data.validation_split,
        data.test_split,
        data.result_type,
      ];

      let options = {
        mode: 'text',
        pythonPath: config.python_exe_path,
        pythonOptions: ['-u'],
        scriptPath: getAssetPath('/python-scripts/tabularData'),
        args: args,
      };

      pyShell = new PythonShell('train_model.py', options);

      pyShell.stdout.on('data', function (message) {
        console.log(message);
        try {
          const jsonData = JSON.parse(message);
          eps.push(jsonData);
          acc = Math.max(jsonData.val_accuracy, acc);
          pyShell.stdin.write(cancelTraining + '\n');
        } catch (e) {
          const wordArr = message.split(' ');
          if (wordArr[0] == 'Epoch') {
            win.webContents.send('change-training-text', wordArr[1]);
          }
          if (wordArr[0].split('/').length == 2) {
            win.webContents.send(
              'change-training-progress',
              wordArr[0].split('/')[0] / wordArr[0].split('/')[1],
            );
          }
        }
      });
      let error = false;
      pyShell.stderr.on('data', function (err) {
        console.log('Python error');
        console.log(err);
        if (!err.toLowerCase().includes('warning') && err.includes('Error')) {
          error = true;
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

      pyShell.stderr.on('data', function (err) {
        console.log(err);
      });

      pyShell.on('close', (code, signal) => {
        try {
          const data = fs.readFileSync(
            path.join(model_path, 'info.json'),
            'utf8',
          );
          const jsonData = JSON.parse(data);
          let newEpochs = jsonData.epochs;
          newEpochs.push(...eps);
          jsonData.epochs = newEpochs;
          jsonData.accuracy = Math.max(acc, jsonData.accuracy);

          fs.writeFileSync(
            path.join(model_path, 'info.json'),
            JSON.stringify(jsonData, null, 2),
          );
        } catch (err) {
          console.log(err);
          win.webContents.send('create-snackbar', {
            message: 'modify-file-error-message',
            title: 'modify-file-error-title',
            alertVariant: 'error',
            autoHideDuration: 3000,
            // persist: true,
            // buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
          });
        }

        if (error) {
          win.webContents.send('create-snackbar', {
            message: 'error-while-training-message',
            title: 'error-while-training-title',
            alertVariant: 'error',
            autoHideDuration: 3000,
            // persist: true,
            buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
          });
        } else {
          win.webContents.send('create-snackbar', {
            message: 'success-training-message',
            title: 'success-training-title',
            alertVariant: 'success',
            autoHideDuration: 3000,
            // persist: true,
            // buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
          });
        }
        win.webContents.send('close-training-dialog');
      });
    }
  });
}
