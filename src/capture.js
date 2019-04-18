class WebcamCapture {
  constructor() {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.

    this.width = 320;    // We will scale the photo width to this
    this.height = 0;     // This will be computed based on the input stream

    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.
    this.streaming = false;

    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.

    this.video = null;
    this.canvas = null;
    this.photo = null;
    this.startbutton = null;

    const ipc = require('electron').ipcRenderer

    var keydown_callback = function(event) {
      console.log(event.code)
      if(event.code == "KeyQ") {
        takepicture()
      } else if(event.code == "KeyW") {
        console.log('trying to print')
        ipc.send('print')
      }
    }


    window.addEventListener("keydown", keydown_callback , false)

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
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(this.height)) {
          this.height = this.width / (4/3);
        }
      
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

  // Fill the photo with an indication that none has been
  // captured.
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

  
  // Set up our event listener to run the startup process
  // once loading is complete.
  // window.addEventListener('load', startup, false);
}


window.webcam = new WebcamCapture()
window.webcam.startup()