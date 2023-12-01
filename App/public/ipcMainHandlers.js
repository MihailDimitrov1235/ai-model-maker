const { ipcMain } = require('electron');
const { getConfig } = require('./configUtils');

function setupIPCMain(win) {
  
    ipcMain.on('check-vnev', (event, arg) => {
        const config = getConfig()
        if(!config.python_exe_path){
            win.webContents.send('no-vnev')
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