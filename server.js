const express = require ('express');

const socket = require('socket.io');

const app = express();

const server = app.listen(8181,function(){
    console.log("Server running on port 8181");
});

app.use(express.static('public'));


//socket set app
 const io = socket(server);

 io.on('connection',function(socket){
    console.log("Have Client Connect!"+ ' ' + socket.id);
    socket.on('contentChat',function(data){
        console.log(data)
        // io.sockets.emit('contentChatResend',data);
        socket.to('contentChatResend',data);

    });
    
    
    socket.on('typing',function(data){
        socket.broadcast.emit('typing', data);
    }) 
    socket.on('notyping',function(data){
        socket.broadcast.emit('notyping', data);
    });
 });

 