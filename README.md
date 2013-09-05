node-keyupdown
==============

emulate keyup and keydown on nodejs.


## Sample

```javascript
var keydownup = require("./keyemulator")
keydownup(process.stdin)

process.stdin.on('keydown', function(){
  console.log("keydown")
})
process.stdin.on('keyup', function(){
  console.log("keyup")
})
process.stdin.on('keypress', function(ch, key){
  console.log("keypress")
  if(key && key.name == "c" && key.ctrl){
    console.log("exit")
    process.exit()
  }
})
process.stdin.setRawMode(true);
process.stdin.resume()
```
