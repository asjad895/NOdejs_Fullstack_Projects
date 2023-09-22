
const mongoose=require('mongoose');

const groups=new mongoose.Schema({
    name:String,
    usecase:String
})
module.exports=mongoose.model('group',groups);

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://mdasjad895:djpgwjc7YXTx48sx@cluster2.utc2zum.mongodb.net/?retryWrites=true&w=majority";

// MongoClient.connect(url, function(err, client) {
//     if (err) console.log(err);
//     console.log("Database created!");
//     client.close();
//   });

// MongoClient.connect(url, function(err, client) {
//     if (err) throw err;
//     var db = client.db("Chat");
//     db.createCollection("groups", function(err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       db.close();
//     });
//   });
// //djpgwjc7YXTx48sx
// //mdasjad895

// // mongodb+srv://mdasjad895:<password>@cluster2.utc2zum.mongodb.net/?retryWrites=true&w=majority

// MongoClient.connect(url, function(err, client) {
//     if (err) console.log(err);
//     var db = client.db("Chat");
//     var myobj = [
//       { name: 'John', usecase: 'AI'},
//       { name: 'Peter', usecase: 'AI'},
//       { name: 'Amy', usecase: 'AI'},
//       { name: 'Hannah', usecase: 'AI'},
//       { name: 'Michael', usecase: 'Valley 345'},
//       { name: 'Sandy', usecase: 'Ocean blvd 2'},
//       { name: 'Betty', usecase: 'Green Grass 1'},
//       { name: 'Richard', usecase: 'Sky st 331'},
//       { name: 'Susan', usecase: 'One way 98'},
//       { name: 'Vicky', usecase: 'Yellow Garden 2'},
//       { name: 'Ben', usecase: 'Park Lane 38'},
//       { name: 'William', usecase: 'Central st 954'},
//       { name: 'Chuck', usecase: 'Main Road 989'},
//       { name: 'Viola', usecase: 'Sideway 1633'}
//     ];
//     db.collection("groups").insertMany(myobj, function(err, res) {
//       if (err) console.log(err);
//       console.log("Number of documents inserted: " + res.insertedCount);
//       client.close();
//     });
//   });
