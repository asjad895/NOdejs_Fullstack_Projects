const server = require("socket.io")(8000, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

const users={};

server.on("connection", (socket) => {
    // send a message to the client
    // event
     socket.on('new_user',name=>{ 
        console.log('aa gya',name);
        users[socket.id]=name;
        socket.broadcast.emit('user_joined', { name });
        // console.log('joined ');


    })
    // event
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]});
        // console.log('bhej dya');
    })
})