const { ipcMain } = require('electron');
const { getAssetPath } = require('../../utils');
import { getConfig } from '../../utils/configUtils';
const { PythonShell } = require('python-shell');
const fs = require('fs');

const path = require('path');

export function setupIPCModelHandlers(win) {
  const tabularDatasetsFolder = getAssetPath(`datasets/table`);
  const imageDatasetsFolders = [
    getAssetPath(`datasets/image/classification`),
    getAssetPath(`datasets/image/detection`),
    getAssetPath(`datasets/image/captioning`),
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
    const args = [
      getAssetPath('datasets/table/' + arg.dataset),
      arg.learningRate,
      arg.epochs,
      arg.batchSize,
      arg.target,
      arg.dataSplit[1],
      arg.dataSplit[2],
    ];
    arg.layers.forEach((layer) => {
      args.push(JSON.stringify(layer));
    });
    const config = getConfig();
    let options = {
      mode: 'text',
      pythonPath: config.python_exe_path,
      pythonOptions: ['-u'], 
      scriptPath: getAssetPath('/python-scripts/tabularData'),
      args: args,
    };

    let pyShell = new PythonShell('create_data_and_model.py', options);

    pyShell.stdout.on('data', function (message) {
      console.log(message);
    });
  });
}
