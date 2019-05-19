class WebcamCapture {
  constructor() {
    this.width = document.documentElement.clientWidth;    // We will scale the photo width to this
    // this.height = 0;     // This will be computed based on the input stream

    this.streaming = false;
    this.video = document.getElementById('video');

    this.start_webcam()
  }

  start_webcam() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const webcam_id = this.select_best_webcam(devices)
      this.initialise_video_element(webcam_id)
    })

    video.addEventListener('canplay', this.configure_video_element.bind(this), false);
  }

  select_best_webcam(mediaDevices) {
    // in theory, if this camera isn't found, getUserMedia will ignore it and fallback to whatever the default is
    return this.webcam_id(mediaDevices, 'FULL HD 1080P Webcam')
  }

  webcam_id(mediaDevices, label) {
    return mediaDevices
      .filter(device => device.kind === 'videoinput')
      .find(device => device.label.includes('FULL HD 1080P Webcam') )
      .deviceId
  }

  webcam_options(webcam_id) {
    return {
        video: {
          width: 1920, // TODO: maybe get this from capabilities.width.max
          height: 1080,
          chromeMediaSourceId: webcam_id
        },
        audio: false
      }
  }

  initialise_video_element(webcam_id) {
    const options = this.webcam_options(webcam_id)
    console.log(webcam_id, options)
    navigator.mediaDevices.getUserMedia(options)
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.play();

        const mediaStreamTrack = stream.getVideoTracks()[0];
        this.imageCapture = new ImageCapture(mediaStreamTrack);

        window.media = stream

      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });
  }

  configure_video_element(event) {
    console.log('configure_video_element')
    if (!this.streaming) {
      //scale video from actual resolution to desired:
      console.log('raw video:', this.video.videoWidth)
      this.height = this.video.videoHeight / (this.video.videoWidth/ this.width);     
      this.video.setAttribute('width', this.width);
      // this.video.setAttribute('height', this.height);
      this.streaming = true;
    }
  }

  take_picture(){
    this.imageCapture.takePhoto({ imageWidth: 1920, imageHeight: 1080 })
    .then(this.send_photo_to_preview_elements.bind(this))
    .catch(error => console.error('takePhoto() error:', error));
  }

  send_photo_to_preview_elements(blob) {
    document.querySelectorAll(".photo_preview").forEach(element => {
      element.src = URL.createObjectURL(blob);
      element.onload = () => { URL.revokeObjectURL(this.src); }
    })
  }
}

module.exports = WebcamCapture