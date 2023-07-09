const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cor =require('cors');
require('./db/db');
const User=require("./models/register");
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');


const db=process.env.MONGODB_URI||'mongodb+srv://120ad0027:kOJB6fgFFb0dftcf@cluster0.cjruorq.mongodb.net/chatapp?retryWrites=true&w=majority';
// #return promise
console.log("DB URL:", db);

mongoose.connect(db,{
    useNewUrlparser:true,
}).then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log('Connection failed', err);
  });



const app = express();
const path = require('path');
app.set('view engine', 'ejs');
// Parse JSON data
app.use(express.json());
// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cor());


app.use(express.static('public', {
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
  }));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
const nodemailer = require('nodemailer');

const auth = require('./middleware/auth'); // Import the auth middleware
// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'iiitasjad895@gmail.com',
    pass: 'mpacduqkzbgcytuw',
  },
});



const sendRegistrationEmail = (email,username,password) => {
  const mailOptions = {
    from: 'mdasjad895@gmail.com',
    to: email,
    subject: 'Registration Successful',
    html: `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f2f2f2;
          }

          h1 {
            color: #333333;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #535cdd;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .logo {
            text-align: center;
            margin-bottom: 20px;
          }

          .logo-img {
            width: 100px;
          }

          .content {
            margin-bottom: 20px;
          }

          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4caf50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <img src="./logo.jpg" alt="Chat App Logo" class="logo-img">
            <h1>Welcome to PeakChat</h1>
          </div>
          <div class="content">
            <p>Click the button below to log in:</p>
            <p>Here are your registration details:</p>
            <ul>
            <li>Username:  ${username}</li>
            <li>Password:  ${password}</li>
          </ul>
          <a href="https://peakchat.com/login" class="button">Log in</a>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Failed to send registration email:', err);
    } else {
      console.log('Registration email sent:', info.response);
    }
  });
};

  
app.post('/register', async (req, res) => {
  // Extract the registration form data from the request body
  const { username, password, email } = req.body;

  // Check if a user with the same username or email already exists
  const existingUser = await User.findOne({username});
  if (existingUser) {
    // User already exists, handle it by alerting the user
    return res.status(400).json({error:'User already exists. Please choose a different username or email.'} );
  }

  // Create a new user
  const newUser = new User({ username, password, email });

  // Save the user to the database
  newUser.save()
    .then(() => {
      // Send registration success email to the user
      sendRegistrationEmail(email, username, password);
      console.log("bhej dya");
      res.redirect('/login'); // Redirect the user to the login page
    })
    .catch((err) => {
      console.error('Failed to save user:', err);
      res.status(500).json({error:'Registration failed. Please try again.'});
    });
});

  
  app.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
  });

  app.get('/chat', auth, async (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'chat.html'));
  });

  app.post('/login', async (req, res) => {
    // Extract the login credentials from the request body
    const { username, password } = req.body;
    User.findOne({ username: username, password: password })
    .then(user => {
        if (user) {
          // Set a cookie for the logged-in user
          res.cookie('user', user.username, { maxAge: 900000, httpOnly: true })
            // Login successful, render the dashboard page with the chat app
          res.redirect('/chat');
        } else {
            // Login failed, redirect back to login page with an error message
            res.status(500).json({error:'invalid credential'})
            res.redirect('/login');
        }
    })
    .catch(err => {
        console.error('Login error:', err);
        res.status(500).json({error:'invalid credential'})
        res.redirect('/login');
    });
  });

  
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is up and running on port ${PORT}`);
// });

// // Set up Global configuration access
// dotenv.config();
  
// let PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is up and running on ${PORT} ...`);
// });
  
// // Main Code Here  //
// // Generating JWT
// app.post("/user/generateToken", (req, res) => {
//     // Validate User Here
//     // Then generate JWT Token
  
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     let data = {
//         time: Date(),
//         userId: 12,
//     }
  
//     const token = jwt.sign(data, jwtSecretKey);
  
//     res.json(
//         {token}
//     );
// });
  
// // Verification of JWT
// app.get("/user/verified", (req, res) => {
//     // Tokens are generally passed in header of request
//     // Due to security reasons.
  
//     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     console.log(tokenHeaderKey)
    
//     try {
//         const token = req.headers[tokenHeaderKey];
//         console.log(token)
    
//         if (token) {
//             const verified = jwt.verify(token, jwtSecretKey);
//             if (verified) {
//                 return res.send("Successfully Verified");
//             } else {
//                 // Access Denied
//                 return res.status(401).send("Invalid token");
//             }
//         } else {
//             // Token not provided
//             return res.status(401).send("Token not provided");
//         }
//     } catch (error) {
//         // Access Denied
//         return res.status(401).send(error.message);
//     }
// })


module.exports = app;