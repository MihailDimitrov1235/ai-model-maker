const { ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { PythonShell } = require('python-shell');
const { setupIPCMainPyEnv } = require('./pyEnvHandlers');
const XLSX = require('xlsx');
const { parse } = require('csv-parse/sync');
const { getAssetPath } = require('../utils');

function setupIPCMain(win) {
  setupIPCMainPyEnv(win);

  ipcMain.on('select-tabular-file', (event, arg) => {
    const options = {
      filters: [{ name: 'Tabular', extensions: ['csv', 'xlsx'] }],
    };
    dialog
      .showOpenDialog(options)
      .then((data) => {
        console.log(data);
        const fileName = data.filePaths[0];
        win.webContents.send('set-tabular-file', data);

        fs.readFile(fileName, 'binary', function (err, data) {
          let jsonData;

          const ext = path.extname(fileName).toLowerCase();

          if (ext === '.xlsx') {
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          } else if (ext === '.csv') {
            const csvData = data.toString();
            try {
              jsonData = parse(csvData, {
                delimiter: ';',
                skip_empty_lines: true,
              });
            } catch (err) {
              jsonData = parse(csvData, {
                skip_empty_lines: true,
              });
              console.log(err);
            }
            console.log(jsonData);
          } else {
            win.webContents.send('set-tabular-file-data', {
              error: 'Unsupported file format',
            });
            return;
          }

          win.webContents.send('set-tabular-file-data', { data: jsonData });
        });
      })
      .catch((err) => {
        console.log(err);
        return false;
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
                /\.(jpg|png)$/i.test(path.extname(file)),
              );

              // Construct full paths for image files
              const newImagePaths = imageFiles.map((file) =>
                path.join(folderPath, file),
              );
              win.webContents.send('set-image-folder', { data: newImagePaths });
              console.log(newImagePaths);
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
        console.log(data);
        const filePath = data.filePaths[0];

        console.log(data);
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            console.error(`Error reading file: ${filePath}`, err);
          } else {
            if (data) {
              // Split the string into an array based on a delimiter (e.g., comma)
              const dataArray = data.split(',');

              // Handle the array data (e.g., display it)
              console.log('File content as array:', dataArray);
              //win.webContents.send('set-select-label', dataArray);
              win.webContents.send('set-image-label', { data: dataArray });
            } else {
              console.error('File content is undefined.');
              // Handle the case when the content is undefined
            }
            //const dataArray = data.split('\n');
            // Handle the file content (e.g., display it)
            //console.log('File content:', dataArray);
            //win.webContents.send('set-image-label', dataArray);
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
    const dir = getAssetPath(`datasets/table/${arg.name}`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log('made');
    }
    console.log('yes');
    const csvFilePath = path.join(dir, 'data.csv');
    fs.writeFileSync(csvFilePath, csvData.join('\n'), 'utf-8');
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
}

module.exports = { setupIPCMain };
