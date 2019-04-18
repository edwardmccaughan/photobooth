const { app, BrowserWindow, ipcMain} = require('electron')
const exec = require("child_process").exec
const fs = require('fs');

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  win.loadFile('index.html')
  win.setFullScreen(true)

  function pdfSettings() {
      var paperSizeArray = ["A4", "A5"];
      var option = {
          landscape: false,
          marginsType: 0,
          printBackground: false,
          printSelectionOnly: false,
          // pageSize: paperSizeArray[settingCache.getPrintPaperSize()-1],
      };
    return option;
  }

  function print_to_pdf() {
    win.webContents.printToPDF(pdfSettings(), function(err, data) {
      if (err) {
        console.log('error!', err)
        return;
      }
      try{
          const filePath = './generated_pdf.pdf'
          fs.writeFileSync(filePath, data);

          exec(`lpr ${filePath}`, () => fs.unlink(filePath, (error) => {console.log(error)}));

      }catch(err){
        console.log('big error!', err)
      }
    })
  }


  // const ipc = electron.ipcMain
  ipcMain.on('print', function (event) {
    console.log('print event received')
    // console.log(win.webContents.getPrinters())
    // win.webContents.print({silent: false, deviceName: 'ML-1630-Series'}, (success) => {
    // win.webContents.print({silent: true})
    // win.webContents.print({silent: true}, (success) => {
    //   console.log('printing: ', success);
    // });

    print_to_pdf()
  })
}

app.on('ready', createWindow)