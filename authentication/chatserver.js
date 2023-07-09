const app = require('./index'); // Import the authentication server
const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://127.0.0.1:8000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  socket.on('new_user', (name) => {
    console.log('aa gya', name);
    socket.broadcast.emit('user_joined', { name });
  });

  socket.on('send', (message) => {
    const name = socket.handshake.headers.cookie.username;
    socket.broadcast.emit('recieve', { message: message, name: name });
  });
});

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});

