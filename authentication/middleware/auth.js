const user = require("../models/register");

const auth = async (req, res, next) => {
  try {
    const username = req.cookies['user']; // Assuming the username is stored in the cookie as "user"
    console.log("auth:  "+username);
    
    // Check if the user exists in the session or not
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
