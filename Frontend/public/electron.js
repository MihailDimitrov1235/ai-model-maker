const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const exec = require("child_process").exec;

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1980,
    height: 1080,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true
    }
  })
  
  Menu.setApplicationMenu(null)
  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools()
}
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on("execute", (command) => {
  console.log("executing ls");
  child = exec("ls", function (error, stdout, stderr) {
    if (error !== null) {
      console.log("exec error: " + error);
    }
  });
});

// ipcMain.on("open_json_file_sync", () => {
//   const fs = require("fs");

//   fs.readFile("config.json", function (err, data) {
//     if (err) {
//       return console.error(err);
//     }
//     printBoth("Called through ipc.send from guiExample.js");
//     printBoth("Asynchronous read: " + data.toString());
//   });
// });

// ipcMain.on("open_json_file_async", () => {
//   const fs = require("fs");

//   const fileName = "./config.json";
//   const data = fs.readFileSync(fileName);
//   const json = JSON.parse(data);

//   printBoth("Called through ipc.send from guiExample.js");
//   printBoth(
//     `Data from config.json:\nA_MODE = ${json.A_MODE}\nB_MODE = ${json.B_MODE}\nC_MODE = ${json.C_MODE}\nD_MODE = ${json.D_MODE}`
//   );
// });