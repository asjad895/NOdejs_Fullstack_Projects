const express = require('express');
const routerg = express.Router();
const Group = require('../models/group'); // Import your data model
// Define an API endpoint to fetch existing group data
const{groups,newgroups}=require('../controllers/groupsControllers');
routerg.route('/').get(groups);

// Define a route to create a new group
routerg.route('/newgroups').post(newgroups);

// Add more routes as needed

module.exports = routerg;
