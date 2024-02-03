const { ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { PythonShell } = require('python-shell');
const XLSX = require('xlsx');
const { parse } = require('csv-parse/sync');
const { getAssetPath, convertCsvToArray } = require('../../utils');

function setupIPCDatasets(win) {
  const datasetsFolderPaths = [
    {
      path: getAssetPath(`datasets/table`),
      type: 'table',
    },
    {
      path: getAssetPath(`datasets/image/classification`),
      type: 'image',
      subType: 'classification',
    },
    {
      path: getAssetPath(`datasets/image/detection`),
      type: 'image',
      subType: 'detection',
    },
    {
      path: getAssetPath(`datasets/image/captioning`),
      type: 'image',
      subType: 'captioning',
    },
  ];

  ipcMain.handle('select-tabular-file', async (event, arg) => {
    const options = {
      filters: [{ name: 'Tabular', extensions: ['csv', 'xlsx'] }],
    };
    const { canceled, filePaths } = await dialog.showOpenDialog(options);
    if (!canceled) {
      const fileName = filePaths[0];
      // win.webContents.send('set-tabular-file', data);

      const ext = path.extname(fileName).toLowerCase();

      let jsonData;

      if (ext === '.xlsx') {
        const data = fs.readFileSync(fileName, 'binary');
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        return { file: fileName, data: jsonData };
      } else if (ext === '.csv') {
        const content = fs.readFileSync(fileName, 'utf-8');
        jsonData = convertCsvToArray(content);
        return { file: fileName, data: jsonData };
      } else {
        return { error: 'Unsupported file format', file: fileName };
      }
    }
    return {
      canceled: true,
    };
  });

  ipcMain.handle('select-image-folder', async (event, arg) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    if (!canceled) {
      const folderPath = filePaths[0];

      const files = fs.readdirSync(folderPath);
      // Filter only image files (you may customize this logic)
      const imageFiles = files.filter((file) =>
        /\.(jpg|png|jpeg)$/i.test(path.extname(file)),
      );

      // Construct full paths for image files
      const newImagePaths = imageFiles.map((file) =>
        path.join(folderPath, file),
      );
      return { data: newImagePaths };
    }
    return { canceled: true };
  });

  ipcMain.handle('select-label', async (event, arg) => {
    //const [imagePaths, setImagePaths] = useState([]);
    const options = {
      filters: [{ name: 'Labels', extensions: ['txt'] }],
    };
    const { canceled, filePaths } = await dialog.showOpenDialog(options);

    if (canceled) {
      return { canceled: true };
    }
    const filePath = filePaths[0];

    const data = fs.readFileSync(filePath, 'utf-8');
    const dataArray = data.split(',');
    return { data: dataArray };
  });

  ipcMain.on('create-dataset-table', (event, arg) => {
    const csvData = arg.bodyData.map((row) => row.join(','));
    csvData.unshift(arg.header.join(','));

    const transformedSelectedTypes = {};
    arg.selectedTypes.forEach((item, idx) => {
      transformedSelectedTypes[arg.header[idx]] = item;
    });
    arg.selectedTypes = transformedSelectedTypes;

    const dir = getAssetPath(`datasets/table/${arg.name}`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    } else {
      console.log('already exists');
    }
    const csvFilePath = path.join(dir, 'data.csv');
    const jsonFilePath = path.join(dir, 'info.json');
    fs.writeFileSync(csvFilePath, csvData.join('\n'), 'utf-8');
    delete arg.bodyData;
    fs.writeFileSync(jsonFilePath, JSON.stringify(arg, null, 2), 'utf8');
  });

  ipcMain.on('create-dataset-labels', (event, arg) => {
    const dir = getAssetPath(`datasets/image/${arg.type}/${arg.name}`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    } else {
      console.log('already exists');
    }
    const csvFilePath = path.join(dir, 'labels .csv');
    const jsonFilePath = path.join(dir, 'info.json');
    fs.writeFileSync(csvFilePath, arg.labels.join(','), 'utf-8');
    delete arg.labels;
    fs.writeFileSync(jsonFilePath, JSON.stringify(arg, null, 2), 'utf8');
  });

  ipcMain.on('request-image', (event, data) => {
    const imagePath = data.path;
    fs.readFile(imagePath, (err, imageBuffer) => {
      if (err) {
        console.error(err);
        return;
      }

      // Convert the image buffer to a data URL
      const imageDataURL = `data:image/png;base64,${imageBuffer.toString(
        'base64',
      )}`;
      // Send the image data back to the renderer process
      win.webContents.send('set-request-image', { data: imageDataURL });
    });
  });

  ipcMain.on('request-datasets-info', (event, data) => {
    const page = data.page;
    const datasetsPerPage = data.datasetsPerPage;

    const startTarget = datasetsPerPage * (page - 1);
    const endTarget = datasetsPerPage * page;

    let datasetsInfo = [];

    let passed = 0;
    datasetsFolderPaths.forEach((folderPath) => {
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
          const jsonData = JSON.parse(data);
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
          datasetsInfo.push(jsonData);
        }
      }
    });
    win.webContents.send('set-request-datasets-info', {
      data: datasetsInfo,
    });
  });

  ipcMain.on('get-datasets-count', (event, data) => {
    let datasetCount = 0;
    datasetsFolderPaths.forEach((folderPath) => {
      if (fs.existsSync(folderPath.path)) {
        const folders = fs.readdirSync(folderPath.path);
        datasetCount += folders.length;
      }
    });
    win.webContents.send('set-datasets-count', {
      data: datasetCount,
    });
  });
}

module.exports = { setupIPCDatasets };
