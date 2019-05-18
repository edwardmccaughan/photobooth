class WebcamCapture {
  constructor() {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.
    this.width = 640;    // We will scale the photo width to this
    this.height = 0;     // This will be computed based on the input stream

    this.streaming = false;

    this.video = document.getElementById('video');
    this.canvas = document.getElementById('webcam_canvas');
    this.photo = document.getElementById('photo');
    this.printing_photo = document.getElementById('printing_photo');

    this.start_webcam()
  }

  start_webcam() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.play();
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });

    video.addEventListener('canplay', (ev) => {
      if (!this.streaming) {
        this.height = this.video.videoHeight / (this.video.videoWidth/ this.width);     
        this.video.setAttribute('width', this.width);
        this.video.setAttribute('height', this.height);
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
        this.streaming = true;
      }
    }, false);
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.
  take_picture() {
    var context = this.canvas.getContext('2d');
    if (this.width && this.height) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      context.drawImage(this.video, 0, 0, this.width, this.height);
    
      var data = this.canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
      printing_photo.setAttribute('src', data);
    } else {
      this.clearphoto();
    }
  }
}

module.exports = WebcamCapture