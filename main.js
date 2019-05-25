const { app, BrowserWindow, ipcMain} = require('electron')
const Printer = require('./printer.js')

function createWindow () {
  let mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')
  // mainWindow.webContents.openDevTools()
  mainWindow.setFullScreen(true)

  let printer = new Printer(mainWindow)

  ipcMain.on('print_photo', function (event) {
    console.log('print event received')
    printer.print()
  })
}


app.on('ready', createWindow)