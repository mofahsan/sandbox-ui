const event = require("node:events")
const eventEmitter = new event()

eventEmitter.on("test",()=>{
    console.log("test received")
})

eventEmitter.emit("test",()=>{
    console.log("test emitted")
})

