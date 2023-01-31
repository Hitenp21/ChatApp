const socket = io();
socket.on('connect',function (){
    console.log("srever connected");
    socket.on("newMsg",function(msg){
        console.log("newMsg",msg);
    })
});
socket.on('disconnect',function(){
    console.log("Server disconnected!");
});