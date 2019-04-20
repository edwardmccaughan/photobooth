const { app, BrowserWindow, ipcMain} = require('electron')
const exec = require("child_process").exec
const fs = require('fs');
const Printer = require('./printer.js')

function createWindow () {
  let win = new BrowserWindow({ width: 800, height: 600 })

  win.loadFile('index.html')
  // win.setFullScreen(true)

  let printer = new Printer(win)

  ipcMain.on('print_photo', function (event) {
    console.log('print event received')
    // printer.print_to_pdf()
  })
}


app.on('ready', createWindow)