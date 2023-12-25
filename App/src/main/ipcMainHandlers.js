const { ipcMain } = require('electron');
const { envExists, condaExists } = require('./utils');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const { PythonShell } = require('python-shell');

const envPath = path.join(__dirname, '../../assets/python-scripts/env');
const appDataPath =
  process.env.APPDATA ||
  (process.env.USERPROFILE
    ? path.join(process.env.USERPROFILE, 'AppData', 'Roaming')
    : null);

function setupIPCMain(win) {
  ipcMain.on('check-venv', (event, arg) => {
    if (!envExists(envPath)) {
      if (condaExists) {
        win.webContents.send('no-vnev');
      } else {
        win.webContents.send('no-conda');
      }
    }
  });

  ipcMain.on('create-venv', (event, arg) => {
    if (envExists(envPath)) {
      console.log('already exists');
      return;
    }
    const anacondaShortcutPath = condaExists(appDataPath);
    if (anacondaShortcutPath) {
      const command = `"${anacondaShortcutPath}" && conda create --prefix "${envPath}" python=3.10 --yes && conda activate "${envPath}" && conda install -c conda-forge cudatoolkit=11.2 cudnn=8.1.0`;

      // Execute the command asynchronously
      const childProcess = exec(
        `start /B cmd /C ${command}`,
        (error, stdout, stderr) => {
          console.log(stdout);
          if (error) {
            console.error('Error:', error.message);
          } else {
            console.log('Environment setup complete.');
          }
        },
      );

      childProcess.stdout.on('data', (data) => {
        // Handle the stdout data
        console.log('stdout');
        console.log(data.toString());
      });

      childProcess.stderr.on('data', (data) => {
        // Handle the stderr data
        console.log('stderr');
        console.error(data.toString());
      });
    } else {
      win.webContents.send('no-conda');
    }
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
