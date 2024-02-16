const { ipcMain } = require('electron');
const { envExists, condaExists } = require('../../utils');
const { updateConfig } = require('../../utils/configUtils');
const { exec } = require('child_process');
const path = require('path');

let createEnvProcess = null;
let snack = false;

const envPath = path.join(__dirname, '../../../../assets/python-scripts/env');
const appDataPath =
  process.env.APPDATA ||
  (process.env.USERPROFILE
    ? path.join(process.env.USERPROFILE, 'AppData', 'Roaming')
    : null);

function setupIPCMainPyEnv(win) {
  ipcMain.on('check-env', (event, arg) => {
    if (!envExists(envPath)) {
      if (!snack) {
        snack = true;
        win.webContents.send('create-snackbar', {
          message: 'no-python-message',
          title: 'no-python-title',
          alertVariant: 'warning',
          autoHideDuration: null,
          persist: true,
          buttons: [{ text: 'setup', link: '/learn/setup', variant: 'main' }],
        });
      }
      // if (condaExists) {
      //   win.webContents.send('no-env');
      // } else {
      //   win.webContents.send('no-conda');
      // }
    }
  });

  ipcMain.on('create-env', (event, arg) => {
    if (createEnvProcess) {
      return;
    }
    if (envExists(envPath)) {
      win.webContents.send('close-create-env');
      return;
    }
    const anacondaShortcutPath = condaExists(appDataPath);
    if (anacondaShortcutPath) {
      const command = `start /B cmd /C "${anacondaShortcutPath}" && conda create --prefix "${envPath}" python=3.10 --yes && set CONDA_BAT=1 && echo yes | conda install -c conda-forge cudatoolkit=11.2 cudnn=8.1.0`;
      createEnvProcess = exec(`${command}`, (error, stdout, stderr) => {});

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
        console.log('stderr');
        console.error(data.toString());
        win.webContents.send('close-create-env');
        createEnvProcess = null;
      });
      createEnvProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        win.webContents.send('close-create-env');
        createEnvProcess = null;
      });
    } else {
      win.webContents.send('close-create-env');
      win.webContents.send('no-conda');
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
