const {ipcRenderer} = require('electron')

class WebcamCapture {
  constructor() {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.
    this.width = 320;    // We will scale the photo width to this
    this.height = 0;     // This will be computed based on the input stream

    this.streaming = false;

    this.video = null;
    this.canvas = null;
    this.photo = null;
    this.startbutton = null; 

    window.addEventListener("keydown", this.keydown_handler.bind(this) , false)
  }

  startup() {
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');
    this.photo = document.getElementById('photo');
    this.startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function(stream) {
      this.video.srcObject = stream;
      this.video.play();
    }.bind(this))
    .catch(function(err) {
      console.log("An error occurred: " + err);
    });

    video.addEventListener('canplay', function(ev){
      if (!this.streaming) {
        this.height = this.video.videoHeight / (this.video.videoWidth/ this.width);     
        this.video.setAttribute('width', this.width);
        this.video.setAttribute('height', this.height);
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
        this.streaming = true;
      }
    }.bind(this), false);

    startbutton.addEventListener('click', function(ev){
      this.takepicture();
      ev.preventDefault();
    }.bind(this), false);
    
    this.clearphoto();
  }

  clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    var data = canvas.toDataURL('image/png');
    this.photo.setAttribute('src', data);
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.
  takepicture() {
    var context = this.canvas.getContext('2d');
    if (this.width && this.height) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      context.drawImage(this.video, 0, 0, this.width, this.height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      this.clearphoto();
    }
  }

  print_photo() {
    ipcRenderer.send('print_photo')
  }

  keydown_handler(event) {
    console.log('key pressed', event.code)
    if(event.code == "KeyQ") {
      this.takepicture()
    } else if(event.code == "KeyW") {
      console.log('trying to print')
      this.print_photo()
    }
  }
}



// Set up our event listener to run the startup process
// once loading is complete.
window.addEventListener('load', function(){
  window.webcam = new WebcamCapture()
  window.webcam.startup()
}, false);



