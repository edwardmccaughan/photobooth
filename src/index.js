WebcamCapture = require('./capture.js')
PanelSwitcher = require('./panel_switcher')



keydown_handler = (event) => {
  window.panel_switcher.keydown_hander(event)
}

start = function() {
  window.webcam = new WebcamCapture()
  window.panel_switcher = new PanelSwitcher()
  webcam.startup()
  window.panel_switcher.switch_to_take_photo()
  window.addEventListener("keydown", window.keydown_handler, false)
}


window.addEventListener('load', start, false);