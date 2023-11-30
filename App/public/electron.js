const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('node:path');
const { PythonShell } = require('python-shell');
const { initializeConfig, getConfig } = require('./configUtils');

function createWindow () {

  initializeConfig();
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1980,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  
  Menu.setApplicationMenu(null)

  //load the index.html from a url
  win.loadURL('http://localhost:3000');

  // Open the DevTools.
  win.webContents.openDevTools()

  ipcMain.on('run-python', (event, arg) => {
    getConfig()
    let options = {
      mode: 'text',
      pythonPath: path.join(__dirname, '/../Python/.conda/python.exe'),
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: path.join(__dirname, '/../Python'),
      args: []
    };
    
    // PythonShell.run('Test.py', options).then(messages=>{
    //   // results is an array consisting of messages collected during execution
    //   console.log('results: %j', messages);
    // });
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.