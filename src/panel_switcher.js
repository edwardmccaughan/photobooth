display_countdown = require('./display_countdown.js')

class PanelSwitcher {
  constuctor() {
    var keydown_hander;
    var state;
  }

  display_panel(panel) {
    document.getElementById('take_photo').classList.remove('active')
    document.getElementById('print_preview').classList.remove('active')
    document.getElementById('printing').classList.remove('active')

    document.getElementById(panel).classList.add('active')
  }


  take_picture_with_countdown() {
    display_countdown(3, () => {
      window.webcam.takepicture() 
      this.switch_to_print_preview()
    })
  }

  switch_to_take_photo() {
    // window.state = 'take_photo'
    this.display_panel('take_photo')

    this.keydown_hander = (event) => {
      if(event.code == "KeyQ") {
        this.take_picture_with_countdown()
      }
    }
  }

  switch_to_print_preview() {
    // window.state = 'print_preview'
    this.display_panel('print_preview')

    this.keydown_hander = (event) => {
       if(event.code == "KeyQ") {
        this.switch_to_take_photo()
      } else if(event.code == "KeyW") {
        console.log('trying to print')
        this.switch_to_printing()
        window.webcam.print_photo()
        display_countdown(3, () => {
          this.switch_to_take_photo()
        })
      }
    }
  }

  switch_to_printing() {
    // window.state = 'printing'
    this.display_panel('printing')
    this.keydown_hander = () => {} // do nothing
  }
}

module.exports = PanelSwitcher







