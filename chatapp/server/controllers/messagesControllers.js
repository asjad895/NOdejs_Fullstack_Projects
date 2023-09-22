
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

  module.exports={messagesC};