const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },     // User ID of the sender
  receiver: { type: String, required: true },   // User ID of the receiver
  groupName: { type: String, required: true },  // Name of the group
  text: { type: String, required: true },       // Message text
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
