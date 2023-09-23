const Message=require('../models/message')
const messagesC=async (req, res) => {
    try {
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
  }

  // Define an API endpoint to fetch messages for a specific group
const messageg=async (req, res) => {
  try {
    // Extract the group name from the query parameter
    const groupName = req.query.group;
    // Fetch messages for the specified group from the "messages" collection
    const messages = await Message.findOne({ groupName });
    console.log(messages);
    // Send the messages as JSON response
    res.json(messages);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports={messagesC,messageg};