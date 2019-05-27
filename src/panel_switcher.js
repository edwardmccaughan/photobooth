const display_countdown = require('./display_countdown.js')

class PanelSwitcher {
  constructor() {
    this.take_picture_countdown_time = 3
    this.print_countdown_time = 3

    var keydown_hander;
  }

  display_panel(panel) {
    document.getElementById('take_photo').classList.remove('active')
    document.getElementById('print_preview').classList.remove('active')
    document.getElementById('printing_progress').classList.remove('active')

    document.getElementById(panel).classList.add('active')
  }

  take_picture_with_countdown() {
    display_countdown(this.take_picture_countdown_time, () => {
      window.webcam.take_picture() // TODO: don't use window...
      this.switch_to_print_preview()
    })
  }

  switch_to_take_photo() {
    this.display_panel('take_photo')

    this.keydown_hander = (event) => {
      if(event.code == "KeyQ") {
        this.take_picture_with_countdown()
        this.keydown_hander = () => {} // ignore inputs while counting down
      }
    }
  }

  print_photo() {
    console.log('trying to print')
    this.switch_to_printing()
    window.print_photo()  // TODO: don't use window...
    display_countdown(this.print_countdown_time, () => {
      this.switch_to_take_photo()
    })
  }

  switch_to_print_preview() {
    this.display_panel('print_preview')

    this.keydown_hander = (event) => {
       if(event.code == "KeyQ") {
        this.switch_to_take_photo()
      } else if(event.code === "KeyW") {
        this.print_photo();
      }
    }
  }

  switch_to_printing() {
    this.display_panel('printing_progress')
    this.keydown_hander = () => {} // ignore inputs while printing
  }
}

module.exports = PanelSwitcher







