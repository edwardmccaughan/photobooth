display_countdown = function(time, callback){
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

module.exports = display_countdown