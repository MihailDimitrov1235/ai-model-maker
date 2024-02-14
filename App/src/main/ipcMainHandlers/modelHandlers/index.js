const { ipcMain } = require('electron');
const { getAssetPath } = require('../../utils');
import { getConfig } from '../../utils/configUtils';
const { PythonShell } = require('python-shell');
const fs = require('fs');

const path = require('path');

let pyShell;
let cancelTraining = false;

export function setupIPCModelHandlers(win) {
  const tabularDatasetsFolder = getAssetPath(`datasets/table`);
  const imageDatasetsFolders = [
    getAssetPath(`datasets/image/classification`),
    getAssetPath(`datasets/image/detection`),
    getAssetPath(`datasets/image/captioning`),
  ];

  const modelFolders = [
    {
      path: getAssetPath(`models/table`),
      type: 'table',
    },
    {
      path: getAssetPath(`models/image/classification`),
      type: 'image',
      subType: 'classification',
    },
    {
      path: getAssetPath(`models/image/detection`),
      type: 'image',
      subType: 'detection',
    },
    {
      path: getAssetPath(`models/image/captioning`),
      type: 'image',
      subType: 'captioning',
    },
  ];

  ipcMain.handle('get-tabular-datasets', async (event, arg) => {
    if (fs.existsSync(tabularDatasetsFolder)) {
      const folders = fs.readdirSync(tabularDatasetsFolder);
      return folders;
    } else {
      return [];
    }
  });

  ipcMain.handle('get-image-datasets', async (event, arg) => {
    let result = [];
    imageDatasetsFolders.forEach((folder, idx) => {
      if (fs.existsSync(folder)) {
        let type = '';
        if (idx == 0) {
          type = 'classification';
        } else if (idx == 1) {
          type = 'detection';
        } else if (idx == 2) {
          type = 'captioning';
        }
        const folders = fs.readdirSync(folder);
        folders.forEach((folder) => {
          result.push({ label: folder, type: type });
        });
      }
    });
    return result;
  });

  ipcMain.handle('get-dataset-info', async (event, arg) => {
    const filePath = path.join(tabularDatasetsFolder, arg.name, 'info.json');
    const data = JSON.parse(fs.readFileSync(filePath));
    return data;
  });

  ipcMain.on('create-tabular-model', (event, arg) => {
    if (pyShell) {
      pyShell.kill('SIGINT');
    }
    const save_model_path = getAssetPath('models/table/' + arg.name);
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
      console.log(err);
    });

    pyShell.on('close', (code, signal) => {
      if (!fs.existsSync(save_model_path)) {
        fs.mkdirSync(save_model_path, { recursive: true });
      }
      try {
        fs.writeFileSync(
          jsonFilePath,
          JSON.stringify(infoData, null, 2),
          'utf-8',
        );
      } catch (err) {
        return false;
      }
      win.webContents.send('close-creating-model-dialog');
    });
  });

  ipcMain.handle('get-models', async (event, data) => {
    const page = data.page;
    const modelsPerPage = data.modelsPerPage;

    const startTarget = modelsPerPage * (page - 1);
    const endTarget = modelsPerPage * page;

    let models = [];

    let passed = 0;
    modelFolders.forEach((folderPath) => {
      if (fs.existsSync(folderPath.path)) {
        const folders = fs.readdirSync(folderPath.path);

        const startIndex = passed;
        const endIndex = passed + folders.length;

        let start = 0;
        let end = folders.length;

        if (startTarget >= startIndex) {
          start = startTarget - passed;
        }

        if (endTarget <= endIndex) {
          end = endTarget - passed;
        }

        passed += folders.length;

        if (startIndex > endTarget || endIndex < startTarget) {
          return;
        }

        for (let i = start; i < end; i++) {
          const infoFilePath = path.join(
            folderPath.path,
            folders[i],
            'info.json',
          );
          const data = fs.readFileSync(infoFilePath);
          let jsonData = JSON.parse(data);
          if (folderPath.type == 'table') {
            jsonData.type = 'table';
          } else if (folderPath.type == 'image') {
            jsonData.type = 'image';
            if (folderPath.subType == 'classification') {
              jsonData.subType = 'classification';
            } else if (folderPath.subType == 'detection') {
              jsonData.subType = 'detection';
            } else if (folderPath.subType == 'captioning') {
              jsonData.subType = 'captioning';
            }
          }
          models.push(jsonData);
        }
      }
    });
    return models;
  });

  ipcMain.handle('get-models-count', async (event, data) => {
    let modelsCount = 0;
    modelFolders.forEach((folderPath) => {
      if (fs.existsSync(folderPath.path)) {
        const folders = fs.readdirSync(folderPath.path);
        modelsCount += folders.length;
      }
    });
    return modelsCount;
  });

  ipcMain.handle('get-model', async (event, data) => {
    const model = data.model;
    const type = data.type;
    const subType = data.subType;

    if (pyShell) {
      pyShell.kill('SIGINT');
    }

    const config = getConfig();

    if (type == 'table') {
      try {
        const data = fs.readFileSync(
          getAssetPath(`models/table/${model}/info.json`),
        );
        return JSON.parse(data);
      } catch (err) {
        return { failed: true };
      }
    }
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
        try {
          const jsonData = JSON.parse(message);
          eps.push(jsonData);
          acc = Math.max(jsonData.val_accuracy, acc);
          pyShell.stdin.write(cancelTraining + '\n');
        } catch (e) {
          console.log(message);
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

      pyShell.stderr.on('data', function (err) {
        console.log(err);
      });

      pyShell.stderr.on('data', function (err) {
        console.log(err);
      });

      pyShell.on('close', (code, signal) => {
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
        win.webContents.send('close-training-dialog');
      });
    }
  });
}
