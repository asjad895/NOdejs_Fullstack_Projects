const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://127.0.0.1:5500", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// MongoDB connection URL
const Group=require('./models/group');
const Message = require('./models/message');

// Middleware to handle JSON requests
app.use(express.json());
// Enable CORS for your frontend origin
// Enable CORS for your frontend origin
app.use(cors({
  origin: "http://127.0.0.1:5500", // Replace with your frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: true,
}));

//API

// Import your routers
const groupsRouter = require('./routes/groupsRouter'); // Specify the correct path
const messagesRouter = require('./routes/messagesRouter'); // Specify the correct path

// Mount your routers with URL prefixes
app.use('/api/groups', groupsRouter);
app.use('/api/messages', messagesRouter); // Mount the messages router on '/api/messages'
// Add more routers as needed
const users = {};

io.on("connection", (socket) => {
  // Send a message to the client when a new user connects
  socket.on('new_user', uname => {
    console.log('aa gya', uname);
    users[socket.id] = uname;
    socket.broadcast.emit('user_joined', { uname });
  });

  // Handle the send event and broadcast the message to all clients
  socket.on('send', message => {
    socket.broadcast.emit('recieve', { message, name: users[socket.id] });
  });
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
