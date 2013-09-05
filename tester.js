var keydownup = require("./index")
keydownup(process.stdin)

process.stdin.on('keydown', function(ch, key){
  console.log("____keydown", ch, key)

})
process.stdin.on('keyup', function(ch, key){
  console.log("^^^keyup", ch, key)
})
process.stdin.on('keypress', function(ch, key){
  //console.log("keypress")
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