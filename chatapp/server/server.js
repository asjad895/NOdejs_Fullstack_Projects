const express = require('express');
const FormaMessage=require('./middleware/message');
const createWelcomeMessage=require('./middleware/welcome');
const {userJoin,getCurrentUser,userLeave,getRoomUsers}=require('./middleware/user');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
app.use(express.static('../public'));
// Enable CORS for your frontend origin
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'my-custom-header'],
  credentials: true,
}));

// Middleware to handle JSON requests
app.use(express.json());

const groupsRouter = require('./routes/groupsRouter'); // Specify the correct path
const messagesRouter = require('./routes/messagesRouter'); // Specify the correct path

// Mount your routers with URL prefixes
app.use('/api', groupsRouter);
app.use('/api/messages', messagesRouter); // Mount the messages router on '/api/messages'
// Add more routers as needed

// Configure socket.io with CORS
const io = socketIo(server, {
  cors: {
    origin: "http://127.0.0.1:5500", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Define your socket.io logic here
// Store a mapping of socket IDs to room names
const socketToRoom = {};
const Bot = "AiBot";

io.on("connection", (socket) => {
  // Handle the joinRoom event to allow users to join specific rooms
  socket.on('joinRoom', ({ username, room }) => {
    // Leave the previous room, if any
    if (socketToRoom[socket.id]) {
      socket.leave(socketToRoom[socket.id]);
    }
    // Join the new room
    socket.join(room);
    socketToRoom[socket.id] = room;
    socket.emit('botm', createWelcomeMessage);
    socket.broadcast.to(room).emit('user_joined', FormaMessage(username, 'Joined the room'));
    console.log('User joined the room'+room+': '+username);
  });

  // Handle the send event and broadcast the message to all clients in the same room
  socket.on('sendMessage', ({ room,user, message }) => {
    console.log('romm id: '+socketToRoom[socket.id]+" aya nya message.")
    if (socketToRoom[socket.id]) {
      io.to(room).emit('receiveMessage', FormaMessage(user, message));
    }
  });


  // Handle user disconnection
  socket.on('UserDisconnect', (username) => {
    console.log(`${username} has disconnected.`);
    if (socketToRoom[socket.id]) {
      const room = socketToRoom[socket.id];
      delete socketToRoom[socket.id];
      io.to(room).emit('left', FormaMessage(username, 'User left the room'));
      console.log("bhagga");
    }
  });

  // Other event handlers and logic for your chat application
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
