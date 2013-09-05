var EventEmitter = require('events').EventEmitter;
var _ = require('underscore')

var keypress = require("keypress")

var pressed = false
var pressedKeys = {}
var pressedKeysStack = []
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
    if(!pressedKeys[ch]){
      stream.emit('keydown', ch, key)
    }
    var d = new Date()
    pressed = true
    // push key data
    pressedKeys[ch] = key
    pressedKeys[ch].lastPressed =lastPressed
    // stacking
    pressedKeysStack.unshift(key)
    pressedKeysStack = _.uniq(pressedKeysStack)
    log.debug(pressedKeysStack)
    // last time
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
    // 複数キー対応するにはこれ個別でやらんといかんなあ。
    if(interval > threshold){
      log.debug(interval)
      if(pressedKeysStack.length == 0){
        pressed = false
      }
      var releasedKey = pressedKeysStack.pop()
      var key = pressedKeys[releasedKey]
      delete pressedKeys[releasedKey]
      stream.emit('keyup', releasedKey, key)
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
