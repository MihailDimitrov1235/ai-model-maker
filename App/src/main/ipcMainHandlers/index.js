const { ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { PythonShell } = require('python-shell');
const { setupIPCMainPyEnv } = require('./pyEnvHandlers');
const XLSX = require('xlsx');
const { parse } = require('csv-parse/sync');
const { getAssetPath } = require('../utils');

function convertCsvToArray(csvString) {
  const rows = csvString.split('\n').filter((row) => row.trim() !== '');

  let delimiter = ',';
  if (csvString.indexOf(';') !== -1) {
    delimiter = ';';
  }

  const data = rows.map((row) => {
    let insideQuotes = false;
    let field = '';
    const fields = [];

    for (let char of row) {
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === delimiter && !insideQuotes) {
        fields.push(field.trim());
        field = '';
      } else {
        field += char;
      }
    }

    fields.push(field.trim());
    return fields.map((value) => {
      if (value === '') {
        return '';
      }
      const num = Number(value);
      return isNaN(num) ? value : num;
    });
  });

  return data;
}

function setupIPCMain(win) {
  ipcMain.setMaxListeners(20);
  setupIPCMainPyEnv(win);

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
    //const [imagePaths, setImagePaths] = useState([]);

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
              //setImagePaths(newImagePaths);
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

  ipcMain.on('run-python', (event, arg) => {
    // const dial = dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
    // dial.then(data => {
    //   console.log(data)
    // })

    getConfig();
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

  ipcMain.on('requestImage', (event, data) => {
    const imagePath = data.path;
    console.log('imagePath' + imagePath);
    // Read the image file
    fs.readFile(imagePath, (err, imageBuffer) => {
      if (err) {
        // Handle error
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

  ipcMain.on('requestDatasetsInfo', (event, data) => {
    const tabularDatasetsFolder = getAssetPath(`datasets/table/`);
    // Read the image file
    const datasetsInfo = [];
    fs.readdir(tabularDatasetsFolder, (err, folders) => {
      if (err) {
        console.error('Error reading directory', err);
        return;
      }
      folders.forEach((folder) => {
        const infoFilePath = path.join(
          tabularDatasetsFolder,
          folder,
          'info.json',
        );
        fs.readFile(infoFilePath, 'utf-8', (err, data) => {
          if (err) {
            console.error('Error reading file', err);
          } else {
            const jsonData = JSON.parse(data);
            //console.log(jsonData);
            datasetsInfo.push(jsonData);
            // Do something with the jsonData
            console.log(datasetsInfo);
            win.webContents.send('set-request-datasets-info', {
              data: datasetsInfo,
            });
            return;
          }
        });
      });
    });
  });
}

module.exports = { setupIPCMain };
