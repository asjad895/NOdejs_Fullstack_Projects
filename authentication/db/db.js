// Create a new MongoClient
const { MongoClient } = require('mongodb');

url='mongodb+srv://120ad0027:kOJB6fgFFb0dftcf@cluster0.cjruorq.mongodb.net/chatapp?retryWrites=true&w=majority'
const client = new MongoClient(url, { useUnifiedTopology: true });

// Connect to the MongoDB database
client.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    return;
  }

  // Create the collection if it doesn't exist
  const db = client.db();
  db.createCollection('users', (err) => {
    if (err) {
      console.error('Failed to create collection:', err);
    } else {
      console.log('Collection created');
    }

    // Close the connection when done
    client.close();
  });
});
