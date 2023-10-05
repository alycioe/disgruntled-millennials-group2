const express = require('express');
const multer = require('./middleware/multerMiddleware');

// Route for text posts
app.post('/create-text-post', (req, res) => {
    // Handle text post (no image)
    // req.body contains text data
  });
  
  // Route for text and image posts
  app.post('/create-image-post', upload.single('image'), (req, res) => {
    // Handle image post creation (with image)
    // req.body contains text data
    // req.file contains information about the uploaded image
  });
  