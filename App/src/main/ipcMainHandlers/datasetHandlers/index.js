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

  ipcMain.on('select-tabular-file', (event, arg) => {
    const options = {
      filters: [{ name: 'Tabular', extensions: ['csv', 'xlsx'] }],
    };
    dialog.showOpenDialog(options).then((data) => {
      const fileName = data.filePaths[0];
      win.webContents.send('set-tabular-file', data);

      const ext = path.extname(fileName).toLowerCase();

      let jsonData;

      if (ext === '.xlsx') {
        const data = fs.readFileSync(fileName, 'binary');
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        win.webContents.send('set-tabular-file-data', { data: jsonData });
      } else if (ext === '.csv') {
        const content = fs.readFileSync(fileName, 'utf-8');
        jsonData = convertCsvToArray(content);
        win.webContents.send('set-tabular-file-data', { data: jsonData });
      } else {
        win.webContents.send('set-tabular-file-data', {
          error: 'Unsupported file format',
        });
        return;
      }
    });
  });

  ipcMain.on('select-image-folder', (event, arg) => {
    dialog
      .showOpenDialog({
        properties: ['openDirectory'],
      })
      .then((result) => {
        if (!result.canceled) {
          const folderPath = result.filePaths[0];

          fs.readdir(folderPath, (err, files) => {
            if (err) {
              console.error(`Error reading folder: ${folderPath}`, err);

              return;
            } else {
              // Filter only image files (you may customize this logic)
              const imageFiles = files.filter((file) =>
                /\.(jpg|png|jpeg)$/i.test(path.extname(file)),
              );

              // Construct full paths for image files
              const newImagePaths = imageFiles.map((file) =>
                path.join(folderPath, file),
              );
              win.webContents.send('set-image-folder', { data: newImagePaths });
              // Update state with the list of image paths
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  ipcMain.on('select-label', (event, arg) => {
    //const [imagePaths, setImagePaths] = useState([]);
    const options = {
      filters: [{ name: 'Labels', extensions: ['txt'] }],
    };
    dialog
      .showOpenDialog(options)
      .then((data) => {
        if (data.canceled) {
          return;
        }
        const filePath = data.filePaths[0];

        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            console.error(`Error reading file: ${filePath}`, err);
          } else {
            // Split the string into an array based on a delimiter (e.g., comma)
            const dataArray = data.split(',');

            //win.webContents.send('set-select-label', dataArray);
            win.webContents.send('set-image-label', { data: dataArray });
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
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
    //const csvData = arg.labels.map((item) => item + ',');
    //console.log(csvData);
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
    let page = data.page;
    let pageDif = data.pageDifference;
    let datasetsInfo = [];

    let current = 0;

    console.log('pageDif=' + pageDif);
    datasetsFolderPaths.forEach((folderPath) => {
      if (fs.existsSync(folderPath.path)) {
        const folders = fs.readdirSync(folderPath.path);
        console.log(folders.length);
        let start = 0;
        let end = 0;
        if (
          folders.length + current >= pageDif * page - pageDif &&
          current < page * pageDif
        ) {
          start = pageDif * page - pageDif - current;
        } else {
          console.log(folders);
          return;
        }

        if (start + pageDif > folders.length) {
          end = folders.length;
        } else {
          end = start + pageDif;
        }

        current += folders.length;

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
        // folders.forEach((folder) => {
        //   const infoFilePath = path.join(folderPath.path, folder, 'info.json');
        //   const data = fs.readFileSync(infoFilePath);
        //   const jsonData = JSON.parse(data);
        //   if (folderPath.type == 'table') {
        //     jsonData.type = 'table';
        //   } else if (folderPath.type == 'image') {
        //     jsonData.type = 'image';
        //     if (folderPath.subType == 'classification') {
        //       jsonData.subType = 'classification';
        //     } else if (folderPath.subType == 'detection') {
        //       jsonData.subType = 'detection';
        //     } else if (folderPath.subType == 'captioning') {
        //       jsonData.subType = 'captioning';
        //     }
        //   }

        //
        // });
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
        console.log(folders);
        datasetCount += folders.length;
      }
    });
    win.webContents.send('set-datasets-count', {
      data: datasetCount,
    });
  });
}

module.exports = { setupIPCDatasets };
