const express = require('express');
const multer = require('./middleware/multerMiddleware');
const { POST } = require('./models');


app.get('/', (req, res) => {
  // Send the main dashboard page using res.render or res.sendFile
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Route for text posts
app.post('/create-text-post', (req, res) => {
  // Extract text content from the request body
  const { text } = req.body;

  // Create a new post record in the database
  Post.create({
    text: text,
    // ADD USER ID STUFF
    // user_id: req.user.id, 
  })
    .then((post) => {
      // NEED TO REDIRECT TO THE UPDATED DASHBOARD
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
  const { originalname, filename, path } = req.file;

  // Create a new post record in the database (assuming you have a Post model)
  Post.create({
    text: text,
    imageUrl: `/uploads/${filename}`, // Store the image path
    // Add any other relevant fields like user ID
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
