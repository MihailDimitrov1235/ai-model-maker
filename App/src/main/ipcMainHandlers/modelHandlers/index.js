const { ipcMain } = require('electron');
const { getAssetPath } = require('../../utils');
import { getConfig } from '../../utils/configUtils';
import { pythonRelatedHandlers } from './pythonRelatedHandlers';
const fs = require('fs');

const path = require('path');

export function setupIPCModelHandlers(win) {
  pythonRelatedHandlers(win);
  const tabularDatasetsFolder = getAssetPath(`datasets/table`);
  const imageDatasetsFolders = [
    getAssetPath(`datasets/image/classification`),
    getAssetPath(`datasets/image/detection`),
    getAssetPath(`datasets/image/captioning`),
  ];

  const tabularModelsFolder = getAssetPath(`models/table`);
  const imageModelsFolders = [
    getAssetPath(`models/image/classification`),
    getAssetPath(`models/image/detection`),
    getAssetPath(`models/image/captioning`),
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
    try {
      const data = JSON.parse(fs.readFileSync(filePath));
      return data;
    } catch (err) {
      console.log(err);
      win.webContents.send('create-snackbar', {
        message: 'read-dataset-file-error-message',
        title: 'read-dataset-file-error-title',
        alertVariant: 'error',
        autoHideDuration: 3000,
        // persist: true,
        // buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
      });
    }
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
          try {
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
          } catch (err) {
            console.log(err);
            win.webContents.send('create-snackbar', {
              message: 'read-file-error-message',
              title: 'read-file-error-title',
              alertVariant: 'error',
              autoHideDuration: 3000,
              // persist: true,
              // buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
            });
            try {
              fs.rmSync(path.join(folderPath.path, folders[i]), {
                recursive: true,
                force: true,
              });
            } catch (err) {
              console.log(err);
            }
          }
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

    // if (pyShell) {
    //   pyShell.kill('SIGINT');
    // }

    // const config = getConfig();

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

  ipcMain.handle('get-tabular-models', async (event, data) => {
    if (fs.existsSync(tabularModelsFolder)) {
      const folders = fs.readdirSync(tabularModelsFolder);
      if (data.trained) {
        let newFolders = [];
        folders.forEach((folder) => {
          if (fs.existsSync(path.join(tabularModelsFolder, folder, 'ckpt'))) {
            newFolders.push(folder);
          }
        });
        return newFolders;
      } else {
        return folders;
      }
    } else {
      return [];
    }
  });

  ipcMain.handle('get-image-models', async (event, arg) => {
    let result = [];
    imageModelsFolders.forEach((folder, idx) => {
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
        folders.forEach((folderPath) => {
          if (arg.trained) {
            if (fs.existsSync(path.join(folder, folderPath, 'ckpt'))) {
              result.push({ label: folder, type: type });
            }
          } else {
            result.push({ label: folder, type: type });
          }
        });
      }
    });
    return result;
  });
}
