const {ipcRenderer} = require('electron')
const WebcamCapture = require('./webcam_capture.js')
const PanelSwitcher = require('./panel_switcher')

start = function() {
  webcam = new WebcamCapture()
  panel_switcher = new PanelSwitcher()
  panel_switcher.switch_to_take_photo()
  window.addEventListener("keydown", (event) => {
    panel_switcher.keydown_hander(event)
  }, false)
}

print_photo = function() {
  ipcRenderer.send('print_photo')
}  

window.addEventListener('load', start, false);