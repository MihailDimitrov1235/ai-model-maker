const { ipcMain } = require('electron');
const { getAssetPath } = require('../../utils');
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
}
