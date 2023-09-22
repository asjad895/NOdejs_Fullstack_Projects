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
const url = "mongodb+srv://mdasjad895:djpgwjc7YXTx48sx@cluster2.utc2zum.mongodb.net/?retryWrites=true&w=majority";
const Group=require('./models/group');
const Message = require('./models/message');

// Middleware to handle JSON requests
app.use(express.json());
app.use(express.static('public'));
// Enable CORS for your frontend origin
// Enable CORS for your frontend origin
app.use(cors({
  origin: "http://127.0.0.1:5500", // Replace with your frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: true,
}));

//API
app.post('/api/messages', async (req, res) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
    // Extract data from the request body
    const { sender, receiver, groupName, text } = req.body;

    // Create a new message document
    const message = new Message({
      sender,
      receiver,
      groupName,
      text,
    });

    // Save the message to the database
    await message.save();

    // Send a success response
    res.status(201).json({ message: 'Message stored successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Define an API endpoint to fetch existing group data
app.get('/api/groups', async (req, res) => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(url);
    console.log("Connected to MongoDB");

    // Fetch existing groups from the "groups" collection
    const existingGroups = await Group.find();

    // Extract group names and usecases
    const groupNames = existingGroups.map(group => group.name);
    const groupUsecases = existingGroups.map(group => group.usecase);

    // Send the group data as JSON response
    res.json({ groupNames, groupUsecases });

    // Close the MongoDB connection when done
    mongoose.connection.close();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
