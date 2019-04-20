WebcamCapture = require('./capture.js')

window.state = 'take_photo'

hide_all = function() {
  document.getElementById('take_photo').classList.remove('active')
  document.getElementById('print_preview').classList.remove('active')
  document.getElementById('printing').classList.remove('active') 
}

switch_to_take_photo = function() {
  window.state = 'take_photo'
  hide_all()
  document.getElementById('take_photo').classList.add('active')
}

switch_to_print_preview = function() {
  window.state = 'print_preview'
  hide_all()
  document.getElementById('print_preview').classList.add('active')
}

switch_to_printing = function() {
  window.state = 'printing'

  hide_all()
  document.getElementById('printing').classList.add('active')

  
}


display_countdown= function(time, callback){
  let countdownElement = document.getElementById('countdown')
  countdownElement.classList.add('active')
  let countdown = time
  countdownElement.innerText = countdown;
  countdown--;

  var countdownInterval = setInterval(() => {   
    countdownElement.innerText = countdown;
    countdown--;
    if(countdown < 0) {
      clearInterval(countdownInterval)
      callback()
      countdownElement.classList.remove('active')
    }
  }, 1000) 
} 

takepicture_with_countdown = function() {
  display_countdown(5, () => {
    webcam.takepicture() 
    switch_to_print_preview()
  })
}






keydown_handler = (event) => {
  console.log('key pressed', event.code)

  if(state == 'take_photo') {
    if(event.code == "KeyQ") {
      takepicture_with_countdown()
    }
  } else if(state == 'print_preview') {
      if(event.code == "KeyQ") {
      switch_to_take_photo()
    } else if(event.code == "KeyW") {
      console.log('trying to print')
      switch_to_printing()
      webcam.print_photo()
      display_countdown(5, () => {
        switch_to_take_photo()
      })
    }
  } else if(state == 'printing') {
    // don't respond to key presses
  }  
} 

window.addEventListener('load', () => {
  window.webcam = new WebcamCapture()
  webcam.startup()
  window.addEventListener("keydown", keydown_handler, false)
  switch_to_take_photo()
}, false);