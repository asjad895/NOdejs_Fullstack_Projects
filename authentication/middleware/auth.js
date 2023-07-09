const user = require("../models/register");
//this auth is for if any one click any private link it will check whether user is verified or not if 
//verified then allow else redirect login
const auth = async (req, res, next) => {
  try {
    const username = req.cookies['user']; // Assuming the username is stored in the cookie as "user"
    console.log("auth:  "+username);
    
    // check if the user exists in the session or not
    if (!username) {
      console.log("chor hai");
      // req.session.destroy(); Destroy the session
      return res.redirect("/login"); // Redirect to the login page
    }
    // User exists in the session, you can perform any additional checks if needed
    // Call next() to proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
