const express = require('express');
const routerm = express.Router();
const Message = require('../models/message'); // Import your message data model
const {messagesC,messageg}=require('../controllers/messagesControllers');
// Define a route to store a new message
routerm.route('/').post(messagesC);

// Add more routes as needed
routerm.route('/').get(messageg);
module.exports = routerm;
