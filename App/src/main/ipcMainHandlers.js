const { ipcMain } = require('electron');
const { getConfig } = require('./configUtils');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const { PythonShell } = require('python-shell');

function setupIPCMain(win) {
  
    ipcMain.on('check-venv', (event, arg) => {
        const config = getConfig()
        console.log(config)
        if(!config.python_exe_path){
            win.webContents.send('no-vnev')
        }
    })

    ipcMain.on('create-venv', (event, arg) => {

        const envPath = path.join(__dirname, '../../assets/python-scripts/env');

        if(fs.existsSync(path.join(envPath, 'python.exe'))){
            console.log('already exists')
            return
        }
        const appDataPath = process.env.APPDATA || (process.env.USERPROFILE ? path.join(process.env.USERPROFILE, 'AppData', 'Roaming') : null);

        if (!appDataPath) {
        console.error('Error: Could not determine the AppData path.');
        process.exit(1);
        }

        const startMenuPath = path.join(appDataPath, 'Microsoft', 'Windows', 'Start Menu', 'Programs');

        // Find the folder containing "conda" in its name
        const anacondaFolder = fs.readdirSync(startMenuPath).find(folder => folder.toLowerCase().includes('conda'));


        if (anacondaFolder) {
        const anacondaShortcutPath = path.join(startMenuPath, anacondaFolder, 'Anaconda Prompt.lnk');

            if (fs.existsSync(anacondaShortcutPath)) {
                
            
                const command = `"${anacondaShortcutPath}" && conda create --prefix "${envPath}" python=3.10 --yes && conda activate "${envPath}" && conda install -c conda-forge cudatoolkit=11.2 cudnn=8.1.0`;

                // Execute the command asynchronously
                const childProcess = exec(`start /B cmd /C ${command}`, (error, stdout, stderr) => {
                  console.log(stdout)
                  if (error) {
                    console.error('Error:', error.message);
                  } else {
                    console.log('Environment setup complete.');
                  }
                });

                childProcess.stdout.on('data', (data) => {
                  // Handle the stdout data
                  console.log('stdout')
                  console.log(data.toString());
                });
            
                childProcess.stderr.on('data', (data) => {
                  // Handle the stderr data
                  console.log('stderr')
                  console.error(data.toString());
                });
                
              } else {
                console.error('Anaconda Prompt shortcut not found.');
              }
        } else {
        console.error('No Anaconda-related folder found in the Start Menu Programs directory.');
        }
        
    })

    ipcMain.on('run-python', (event, arg) => {
        // const dial = dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
        // dial.then(data => {
        //   console.log(data)
        // })
        
        getConfig()
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
    })


}

module.exports = { setupIPCMain };