const express = require('express');
const app = express();
const path = require('path');
const socketIo = require('socket.io');
const server = require('http').createServer(app);
const io = socketIo(server);
const port  = process.env.PORT || 8080;
const publicPath = path.join(__dirname,'/../public');


app.use(express.static(publicPath));

io.on("connection",(socket)=>{
    console.log("A new user connected");

    socket.emit("newMsg",{
        from:"server",
        text:"This is order."
    })
    socket.on("createNewMsg",(msg)=>{
        console.log("createNewMsg",msg);

        io.emit("newMessage",{
            from:msg.from,
            text:msg.text,
            createdAt: new Date().getTime()
        })
    })
    socket.on('disconnect',()=>{
        console.log("A user disconnected!");
    });
})



server.listen(port,()=>{
    console.log(`server listen on port no: ${port}`);
})