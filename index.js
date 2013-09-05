var EventEmitter = require('events').EventEmitter;

var keypress = require("keypress")

var pressed = false
var lastPressed = 0
var keypressCount = 0
var immediateRpeat = 0 // for debug
var uptime = 100

var Log = require('log')
var logLevel = "info"
var log = new Log(logLevel)

function keydownup(stream){
  // keypress handling
  kp = keypress(stream)
  stream.on('keypress', function(ch, key){
    if(pressed == false){
      stream.emit('keydown', ch, key)
    }
    var d = new Date()
    pressed = true
    var beforeLastPressed = lastPressed
    lastPressed = d.getTime()
    keypressCount++
  })
  
  // immediate
  function _onImmediate(){
    if(pressed == false){
      return
    }
    var current = new Date()
    var interval = current.getTime() - lastPressed
    if(immediateRpeat % 10000 == 0){
      log.debug(interval,keypressCount)
    }
    var threshold = uptime
    // skip first time
    if(keypressCount == 1){
      threshold = threshold * 2
    }
    if(interval > threshold){
      log.debug(interval)
      pressed = false
      stream.emit('keyup')
      keypressCount = 0

    }
    immediateRpeat++ // for debug
  }

  function onImmediate(){
    _onImmediate()
    setImmediate(onImmediate)
  }
  setImmediate(onImmediate)

}
module.exports = keydownup
