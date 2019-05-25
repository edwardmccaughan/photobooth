class WebcamCapture {
  constructor() {
    // this.width = document.documentElement.clientWidth;    // We will scale the photo width to this
    this.height = document.documentElement.clientHeight;     // This will be computed based on the input stream

    this.streaming = false;
    this.video = document.getElementById('video');

    this.start_webcam()
  }

  start_webcam() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      console.log('connected webcams:', devices.filter(device => device.kind === 'videoinput'))
      const webcam_id = this.select_best_webcam(devices)
      this.initialise_video_element(webcam_id)
    })

    video.addEventListener('canplay', this.configure_video_element.bind(this), false);
  }

  select_best_webcam(mediaDevices) {
    // in theory, if this camera isn't found, getUserMedia will ignore it and fallback to whatever the default is
    return this.webcam_id(mediaDevices, 'HD Pro Webcam C920')
  }

  webcam_id(mediaDevices, label) {
    const device = mediaDevices
      .filter(device => device.kind === 'videoinput')
      .find(device => device.label.includes(label) )

    return (device || {}).deviceId
  }

  webcam_options(webcam_id) {
    return {
        video: {
          // width: 1650, // TODO: maybe get this from capabilities.width.max
          // height: 1080,
          width: document.documentElement.clientWidth, // TODO: maybe get this from capabilities.width.max
          height: document.documentElement.clientHeight - 10,
          chromeMediaSourceId: webcam_id
        },
        audio: false
      }
  }

  initialise_video_element(webcam_id) {
    const options = this.webcam_options(webcam_id)
    navigator.mediaDevices.getUserMedia(options)
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.play();

        const mediaStreamTrack = stream.getVideoTracks()[0];
        this.imageCapture = new ImageCapture(mediaStreamTrack);

         this.imageCapture.getPhotoCapabilities().then(capabilities => {
            window.capabilities = capabilities
        })

        window.media = stream

      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });
  }

  configure_video_element(event) {
    if (!this.streaming) {
      //scale video from actual resolution to desired:
      this.height = this.video.videoHeight / (this.video.videoWidth/ this.width);     
      // this.video.setAttribute('width', this.width);
      // this.video.setAttribute('height', this.height);
      this.streaming = true;
    }
  }

  take_picture(){
    this.imageCapture.takePhoto()
      .then(this.send_photo_to_preview_elements.bind(this))
      .catch(error => console.error('take_picture() error:', error));
  }

  send_photo_to_preview_elements(blob) {
    document.querySelectorAll(".photo_preview").forEach(element => {
      element.src = URL.createObjectURL(blob);
      element.onload = () => { URL.revokeObjectURL(this.src); }
    })
  }
}

module.exports = WebcamCapture