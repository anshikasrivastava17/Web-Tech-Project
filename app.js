const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const User = require('./models/user'); 

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database connection
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Reverie' // Specify your database name here
})
.then(() => {
  console.log("Database connection is ready");
})
.catch((err) => {
  console.error("Database connection error:", err);
});

// Routes

// Home route
app.get("/", (req, res) => {
  res.render('index');
});

// Signup route (GET)
app.get("/signup", (req, res) => {
  res.render('signup');
});

// Signup route (POST)
app.post("/signup", async (req, res) => {
  const { name, email, username, password } = req.body;
  
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      username,
      password: hashedPassword
    });

    // Save the user to the 'users' collection
    await user.save();
    console.log("User saved successfully:", user);
    res.render('home');
  } catch (err) {
    console.error('Error saving user:', err.message);
    res.redirect('/signup');
  }
});

// Home route
app.get("/home", (req, res) => {
  res.render('home');
});

app.get("/men", (req, res) => {
  res.render('men');
});

app.get("/mens_coll", (req, res) => {
res.render('mens_coll');
});

app.get("/women", (req, res) => {
  res.render('women');
});

app.get("/women_coll", (req, res) => {
res.render('women_coll');
});

app.get("/kids", (req, res) => {
  res.render('kids');
});

app.get("/kid_coll", (req, res) => {
res.render('kid_coll');
});

app.get("/wedding", (req, res) => {
  res.render('wedding');
});

app.get("/wed_coll", (req, res) => {
res.render('wed_coll');
});

app.get("/sale", (req, res) => {
  res.render('sale');
});




app.post("/login", async (req, res) => {
  
  try{
    const check = await Collection.findOne({username: req.body.username})

    if(check.password === req.body.password){
      res.render('home');
    }
    else{
      res.send("Wrong Password");
    }
  }
  
  catch{
    res.send("Credentials dont match");
  }
   
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});