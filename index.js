var EventEmitter = require('events').EventEmitter;

var keypress = require("keypress")

var pressed = false
var lastPressed = 0

var timers = []
function clearTimers(){
  timers.forEach(function(timer){
    clearTimeout(timer)
  })
  timers = []
}

function keydownup(stream, interval){
  if(interval == undefined){
    interval = 120
  }
  kp = keypress(stream)
  stream.on('keypress', function(ch, key){
    var d = new Date()
    lastPressed = d.getTime()

    if(pressed == false){
      stream.emit('keydown')
    }
    pressed = true
  })

  var checkKeyup = function(){
    if(pressed == false){
      return
    }
    var i = new Date().getTime() - lastPressed
    var isKeyPressed = (i > interval)
    console.log(i)
    if(isKeyPressed && pressed){
      pressed = false
      stream.emit('keyup')
      clearTimers()
    }
  }
  var timerFunc = function(){
    checkKeyup()
    var t = setTimeout(function(){
      timerFunc()
    }, interval / 2)
    timers.push(t)
  }
  var timer = setTimeout(function(){
    timerFunc()
  }, interval / 2)
  timers.push(timer)
}
keydownup(process.stdin)

process.stdin.on('keydown', function(){
  console.log("keydown")
})
process.stdin.on('keyup', function(){
  console.log("keyup")
})
process.stdin.on('keypress', function(ch, key){
  if(key && key.name == "c" && key.ctrl){
    console.log("exit")
    process.exit()
  }
})
process.stdin.setRawMode(true);
process.stdin.resume()