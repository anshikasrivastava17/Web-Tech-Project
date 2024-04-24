const express = require('express');
const path = require('path');
const ejs = require('ejs');


const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware to serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

//EJS as the view engine
app.set('view engine', 'ejs');

//views directory
app.set('views', path.join(__dirname, 'views'));


// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://anshika17:admin123@cluster0.dctk8v8.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  
const User = mongoose.model('User', userSchema);

//routes for each page
app.get("/", (req, res) => {
    res.render('index');
});

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


app.post('/users', async (req, res) => {
    const { username, email } = req.body;
    try {
      const newUser = new User({ username, email });
      await newUser.save();
      res.redirect('/users');
    } catch (err) {
      console.error('Error saving user:', err.message);
      res.redirect('/');
    }
  });
  
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
      res.render('users', { users });
    } catch (err) {
      console.error('Error finding users:', err.message);
      res.redirect('/');
    }
  });


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
