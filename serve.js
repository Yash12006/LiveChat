const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

let users={};
io.on("connect", socket=>{
    socket.on("new-user",name=>{
        users[socket.id]=name;
        socket.broadcast.emit("user-joined",name);
    });
    socket.on("message",message=>{
        socket.broadcast.emit("message",{message:message,name:users[socket.id]});
    })
    socket.on("disconnect",name=>{
      socket.broadcast.emit("bye",users[socket.id]);
      delete users[socket.id];
    })
})

