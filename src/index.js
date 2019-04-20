WebcamCapture = require('./capture.js')

takepicture_with_countdown = function() {
  webcam.takepicture()
}


keydown_handler = (event) => {
  console.log('key pressed', event.code)
  if(event.code == "KeyQ") {
    takepicture_with_countdown()
  } else if(event.code == "KeyW") {
    console.log('trying to print')
    webcam.print_photo()
  }
} 

window.addEventListener('load', () => {
  window.webcam = new WebcamCapture()
  webcam.startup()
  window.addEventListener("keydown", keydown_handler, false)
}, false);