WebcamCapture = require('./capture.js')



window.addEventListener('load', function(){
  webcam = new WebcamCapture()
  webcam.startup()
}, false);