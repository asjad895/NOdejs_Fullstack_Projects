const Group = require("../models/group");
require('dotenv').config();
const mongoose=require('mongoose');
const url = process.env.MONGODB_URL;
const groups=async (req, res) => {
    try {
      // Connect to the MongoDB database
      await mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
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
  }

  const newgroups=async (req, res) => {
    try {
      // Create a new group based on the request body
      const newGroup = new Group(req.body);
  
      // Save the new group to your database
      const savedGroup = await newGroup.save();
  
      // Return the saved group as a JSON response
      res.status(201).json(savedGroup);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  module.exports ={groups,newgroups};