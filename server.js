const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');  // Multer for handling file uploads
const { POST } = require('./models');  

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer for handling file uploads
// CURRENTLY ONLY FOR LOCAL STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads'); // Destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const upload = multer({ storage: storage });

const users = [];

// Route for rendering the main dashboard
app.get('/', (req, res) => {
  // THIS NEEDS TO BE DONE
  // USE res.render or res.sendFile
});

// Route for users to signup
app.post('/signup', (req, res) => {
  const { email, username, password, animalChoice} = req.body;

  const userExists = users.some(user => user.email === email || user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists '});
  }

  const newUser = { email, username, password, animalChoice };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Route for users to login
app.post('/login', (req, res) => {
  const { loginIdentifier, loginPassword } = req.body;

  const user = users.find(user => user.email === loginIdentifier || user.username === loginIdentifier);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.password !== loginPassword) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  res.json({ message: 'Login successful' });
});

// Route for text posts (no image)
app.post('/create-text-post', (req, res) => {
  // Extract text content from the request body
  const { text } = req.body;

  // Create a new post record in the database
  POST.create({
    text: text,
    // ADD USER ID AND OTHER PARAMETERS
  })
    .then((post) => {
      // Post creation successful
      // REDIRECT TO DASHBOARD...?
      res.redirect('/');
    })
    .catch((err) => {
      console.error('Error creating text post:', err);
      res.status(500).send('Error creating text post');
    });
});

// Route for text and image posts
app.post('/create-image-post', upload.single('image'), (req, res) => {
  // Extract text content from the request body
  const { text } = req.body;

  // Extract image information from the request file (Multer)
  // THIS NEEDS TO BE ADDED
  const { originalname, filename, path } = req.file;

  // Create a new post record in the database (assuming you have a Post model)
  POST.create({
    text: text,
    imageUrl: `/uploads/${filename}`, // Store the image path
    // ADD USER ID AND OTHER PARAMETERS
  })
    .then((post) => {
      // Post creation successful, redirect or send a response
      res.redirect('/');
    })
    .catch((err) => {
      console.error('Error creating image post:', err);
      res.status(500).send('Error creating image post');
    });
});

app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
