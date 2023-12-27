const { ipcMain } = require('electron');
const { envExists, condaExists } = require('../../utils');
const { updateConfig } = require('../../utils/configUtils');
const { exec } = require('child_process');
const path = require('path');

let createEnvProcess = null;
let installLibrariesProcess = null;

const envPath = path.join(__dirname, '../../../../assets/python-scripts/env');
const appDataPath =
  process.env.APPDATA ||
  (process.env.USERPROFILE
    ? path.join(process.env.USERPROFILE, 'AppData', 'Roaming')
    : null);

function setupIPCMainPyEnv(win) {
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
    if (createEnvProcess) {
      return;
    }
    if (envExists(envPath)) {
      win.webContents.send('close-create-env');
      console.log('already exists');
      return;
    }
    const anacondaShortcutPath = condaExists(appDataPath);
    if (anacondaShortcutPath) {
      const command = `start /B cmd /C "${anacondaShortcutPath}" && conda create --prefix "${envPath}" python=3.10 --yes`;
      createEnvProcess = exec(`${command}`, (error, stdout, stderr) => {
        console.log(stdout);
        if (error) {
          console.error('Error:', error.message);
        } else {
          console.log('Environment setup complete.');
          ipcMain.emit('install-libraries');
          win.webContents.send(
            'change-create-env-text',
            'installing libraries',
          );
        }
      });

      createEnvProcess.stdout.on('data', (data) => {
        // Handle the stdout data
        const lines = data.toString().split('\n');
        lines.forEach((line) => {
          console.log(line);
          if (line.includes('...working...')) {
            win.webContents.send(
              'change-create-env-text',
              line.split(': ...working...')[0],
            );
          } else if (line.includes('conda activate')) {
            const matches = line.match(/conda activate (.+)/);
            if (matches && matches.length > 1) {
              const pyExePath = matches[1];
              console.log('Path:', pyExePath);
              updateConfig('python_exe_path', pyExePath);
            }
          }
        });
      });
      createEnvProcess.stderr.on('data', (data) => {
        // Handle the stderr data
        console.log('stderr');
        console.error(data.toString());
      });
      createEnvProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (!installLibrariesProcess) {
          win.webContents.send('close-create-env');
        }
        createEnvProcess = false;
      });
    } else {
      win.webContents.send('close-create-env');
      win.webContents.send('no-conda');
    }
  });

  ipcMain.on('install-libraries', (event, arg) => {
    console.log('installing libs');
    const currentEnvPath = envExists(envPath);
    const anacondaShortcutPath = condaExists(appDataPath);

    if (anacondaShortcutPath && currentEnvPath) {
      const command = `start /B cmd /C "${anacondaShortcutPath}" && set CONDA_BAT=1 && conda activate "${envPath}" && echo yes | conda install -c  conda-forge cudatoolkit=11.2 cudnn=8.1.0`;
      installLibrariesProcess = exec(`${command}`, (error, stdout, stderr) => {
        console.log(stdout);
        if (error) {
          console.error('Error:', error.message);
          win.webContents.send('close-create-env');
          installLibrariesProcess = null;
        } else {
          win.webContents.send('close-create-env');
          installLibrariesProcess = null;
        }
      });
      installLibrariesProcess.stdout.on('data', (data) => {
        // Handle the stdout data
        const lines = data.toString().split('\n');
        lines.forEach((line) => {
          console.log(line);
          if (line.includes('...working...')) {
            win.webContents.send(
              'change-create-env-text',
              line.split(': ...working...')[0],
            );
          }
        });
      });
    } else {
      win.webContents.send('close-create-env');
    }
  });

  ipcMain.on('cancel-create-env', (event, arg) => {
    win.webContents.send('change-create-env-text', 'cancel');
    try {
      createEnvProcess.kill('SIGINT');
    } catch (err) {
      console.log(err);
    }
    createEnvProcess = false;
  });
  return;
}

module.exports = { setupIPCMainPyEnv };
