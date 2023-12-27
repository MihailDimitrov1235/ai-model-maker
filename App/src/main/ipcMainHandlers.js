const { ipcMain } = require('electron');
const { envExists, condaExists } = require('./utils');
const { updateConfig } = require('./utils/configUtils')
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

let createEnvProcess
let installLibrariesProcess

function setupIPCMain(win) {
  ipcMain.on('check-env', (event, arg) => {
    if (!envExists(envPath)) {
      if (condaExists) {
        win.webContents.send('no-env');
      } else {
        win.webContents.send('no-conda');
      }
    }
  });

  ipcMain.on('create-env', (event, arg) => {
    if(createEnvProcess){
      return 
    }
    if (envExists(envPath)) {
      win.webContents.send('close-create-env');
      console.log('already exists');
      return;
    }
    const anacondaShortcutPath = condaExists(appDataPath);
    if (anacondaShortcutPath) {
      const command = `start /B cmd /C "${anacondaShortcutPath}" && conda create --prefix "${envPath}" python=3.10 --yes`;
      createEnvProcess = exec(
        `${command}`,
        (error, stdout, stderr) => {
          console.log(stdout);
          if (error) {
            console.error('Error:', error.message);
          } else {
            console.log('Environment setup complete.');
            ipcMain.emit('install-libraries')
            win.webContents.send('change-create-env-text', 'installing libraries');
          }
        },

      );

      createEnvProcess.stdout.on('data', (data) => {
        // Handle the stdout data
        const lines = data.toString().split('\n');
        lines.forEach((line) => {
          console.log(line)
          if (line.includes('...working...')) {
            win.webContents.send('change-create-env-text', line.split(": ...working...")[0]);
          } else if (line.includes('conda activate')) {
            const matches = line.match(/conda activate (.+)/);
            if (matches && matches.length > 1) {
              const pyExePath = matches[1];
              console.log('Path:', pyExePath);
              updateConfig('python_exe_path', pyExePath)
            }
          }
        })
      });
      createEnvProcess.stderr.on('data', (data) => {
        // Handle the stderr data
        console.log('stderr');
        console.error(data.toString());
      });
      createEnvProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if(!installLibrariesProcess){
          win.webContents.send('close-create-env');
        }
      }); 
    } else {
      win.webContents.send('close-create-env');
      win.webContents.send('no-conda');
    }
  });

  ipcMain.on('install-libraries', (event, arg) => {
    console.log("installing libs")
    const currentEnvPath = envExists(envPath)
    const anacondaShortcutPath = condaExists(appDataPath);

    if(anacondaShortcutPath && currentEnvPath){
      const command = `start /B cmd /C "${anacondaShortcutPath}" && conda activate "${envPath}" && conda install --yes -c  conda-forge cudatoolkit=11.2 cudnn=8.1.0 && conda deactivate`;
      installLibrariesProcess = exec(
        `${command}`,
        (error, stdout, stderr) => {
          console.log(stdout);
          if (error) {
            console.error('Error:', error.message);
          } else {
            console.log('Created with libs');
            win.webContents.send('close-create-env');
          }
        },

      );

      installLibrariesProcess.stdout.on('data', (data) => {
        // Handle the stdout data
        const lines = data.toString().split('\n');
        lines.forEach((line) => {
          console.log(line)
          
        })
      });
    }else{
      win.webContents.send('close-create-env');
    }

  })

  ipcMain.on('cancel-create-env', (event, arg) => {
    win.webContents.send('change-create-env-text', "cancel");
    try{
      createEnvProcess.kill('SIGINT');
    }catch(err){
      console.log(err)
    }
    createEnvProcess = false
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
