class Printer {
  constructor(browserWindow) {
    this.browserWindow = browserWindow
  }

  pdfSettings() {
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

  print_to_pdf() {
    console.log('printing!', this.pdfSettings())
    return


    this.browserWindow.webContents.printToPDF(this.pdfSettings(), function(err, data) {
      
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
}

module.exports = Printer