const fs = require('fs');
const exec = require("child_process").exec

class Printer {
  constructor(browserWindow) {
    this.browserWindow = browserWindow

    this.cleanup_pdf = true
  }

  pdfSettings() {
      var option = {
          landscape: false,
          marginsType: 1,
          printBackground: false,
          printSelectionOnly: false,
          pageSize:  {
            width: 148000, height: 100000
          }
      };
    return option;
  }

  print() {
    this.print_via_pdf()
    // this.print_via_electron()
  }

  print_via_electron() {
    this.browserWindow.webContents.print({silent: false});
  }

  print_via_pdf() {
    this.browserWindow.webContents.printToPDF(this.pdfSettings(), function(err, data) {
      
      if (err) {
        console.log('error!', err)
        return;
      }
      try{
          
          const filePath = './generated_pdf.pdf'
          fs.writeFileSync(filePath, data);

          const lpr_command = `lpr -P Canon-CP910 ${filePath}`

          console.log('printing with lpr command:', lpr_command)
          exec(lpr_command, this.cleanup_pdf );

      }catch(err){
        console.log('big error!', err)
      }
    })
  }

  cleanup_pdf() {
    if(this.cleanup_pdf) {
      const filePath = './generated_pdf.pdf'
      console.log('deleting pdf')
      fs.unlink(filePath, (error) => {console.log(error)})
    }
  }

}

module.exports = Printer