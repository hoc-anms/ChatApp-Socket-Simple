const socket = io('http://localhost:8181/');

//take information from client after send to server   ~emit
//server listen that event and data send from client  ~on
//server send all data to another clients and client send to socket.io  ~emit
//client listen that event and return result

contentMessage = $('#message');
useName=$('#usename');
btnSend = $('#send');      
output= $('#output');
feedback=$('#feedback');
//Emit event
btnSend.click(function(){
    socket.emit('contentChat',{
        useName: useName.val(),
        contentMessage: contentMessage.val(),
    });
});

contentMessage.keypress(function(){
    socket.emit('typing',{
        useName: useName.val(),
    })
});

contentMessage.focusout(function(){
    socket.emit('notyping',{
        useName: useName.val(),
    });
});


socket.on('typing', function(data){
    feedback.html('<p><em>'+data.useName+':is typing...</em></p>');
});

socket.on('notyping',function(data){
    feedback.html('');
});

socket.on('contentChatResend',function(data){
    feedback.html('');
    output.append('<p><strong>'+data.useName+'</strong>:'+data.contentMessage+'</p>',data);
});