var keydownup = require("./index")
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
  if(key.name == "m"){
    console.log("========================")
  }
})
process.stdin.setRawMode(true);
process.stdin.resume()