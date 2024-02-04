const { ipcMain } = require('electron');
const { getAssetPath } = require('../../utils');
import { getConfig } from '../../utils/configUtils';
const { PythonShell } = require('python-shell');
const fs = require('fs');

const path = require('path');

let pyShell;

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
    fs.writeFileSync(jsonFilePath, JSON.stringify(infoData, null, 2), 'utf-8');

    let argsArray = [];
    for (let key in argsObject) {
      argsArray.push(argsObject[key]);
    }

    arg.layers.forEach((layer) => {
      argsArray.push(JSON.stringify(layer));
    });

    const config = getConfig();
    let options = {
      mode: 'text',
      pythonPath: config.python_exe_path,
      pythonOptions: ['-u'],
      scriptPath: getAssetPath('/python-scripts/tabularData'),
      args: argsArray,
    };

    pyShell = new PythonShell('create_data_and_model.py', options);

    pyShell.stdout.on('data', function (message) {
      console.log(message);
    });

    pyShell.stderr.on('data', function (err) {
      console.log(err);
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
      const data = fs.readFileSync(
        getAssetPath(`models/table/${model}/info.json`),
      );
      // let options = {
      //   mode: 'text',
      //   pythonPath: config.python_exe_path,
      //   pythonOptions: ['-u'],
      //   scriptPath: getAssetPath('/python-scripts/tabularData'),
      //   args: [getAssetPath(`/models/table/${model}/model.keras`)],
      // };

      // pyShell = new PythonShell('get_model_summary.py', options);

      // pyShell.stdout.on('data', function (message) {
      //   console.log(message);
      // });

      // pyShell.stderr.on('data', function (err) {
      //   console.log(err);
      // });

      return JSON.parse(data);
    }
  });
}
