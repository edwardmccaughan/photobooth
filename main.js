const { app, BrowserWindow, ipcMain} = require('electron')
const exec = require("child_process").exec
const fs = require('fs');

function createWindow () {
  let win = new BrowserWindow({ width: 800, height: 600 })

  win.loadFile('index.html')
  // win.setFullScreen(true)

  ipcMain.on('print_photo', function (event) {
    console.log('print event received')
    // printer.print_to_pdf(win)
  })
}

// printer = {
//   pdfSettings: function() {
//       var paperSizeArray = ["A4", "A5"];
//       var option = {
//           landscape: false,
//           marginsType: 0,
//           printBackground: false,
//           printSelectionOnly: false,
//           // pageSize: paperSizeArray[settingCache.getPrintPaperSize()-1],
//       };
//     return option;
//   },

//   print_to_pdf: function(win) {
//     console.log('printing!')
//     return


//     win.webContents.printToPDF(printer.pdfSettings(), function(err, data) {
      
//       if (err) {
//         console.log('error!', err)
//         return;
//       }
//       try{
          
//           const filePath = './generated_pdf.pdf'
//           fs.writeFileSync(filePath, data);

//           exec(`lpr ${filePath}`, () => fs.unlink(filePath, (error) => {console.log(error)}));

//       }catch(err){
//         console.log('big error!', err)
//       }
//     })
//   }
// }






app.on('ready', createWindow)