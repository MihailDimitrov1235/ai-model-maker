const { ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { PythonShell } = require('python-shell');
const { setupIPCMainPyEnv } = require('./pyEnvHandlers');
const XLSX = require('xlsx');
const { parse } = require('csv-parse/sync');

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

      dialog.showOpenDialog({
        properties: ['openDirectory'],
      }).then((result) => { if (!result.canceled) {
        const folderPath = result.filePaths[0];

      fs.readdir(folderPath, (err, files) => {
        

        if (err) {
          console.error(`Error reading folder: ${folderPath}`, err);
          
          return;
          
        } else {
          // Filter only image files (you may customize this logic)
          const imageFiles = files.filter(file =>
            /\.(jpg|png)$/i.test(path.extname(file))
          );

          // Construct full paths for image files
          const newImagePaths = imageFiles.map(file =>
            path.join(folderPath, file)
          );
          console.log(newImagePaths);
          // Update state with the list of image paths
          //setImagePaths(newImagePaths);
        }
      });
      


     
    }

  }).catch(err => {
    console.log(err)
  });
      

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
