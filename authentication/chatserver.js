const app = require('./app'); // Import the authentication server
var cookie = require("cookie");
const server = app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

let users = {};
io.on("connection", (socket) => {
  socket.on('new_user', (name) => {
    users[socket.id]=name;
    // var cookies = cookie.parse(socket.handshake.headers.cookie); 
    console.log('user aa gya', users[0]);
    socket.broadcast.emit('user_joined', { name });
  });

  socket.on('send', (message,name) => {
    socket.broadcast.emit('recieve', { message: message, name:users[socket.id] });
  });
});


