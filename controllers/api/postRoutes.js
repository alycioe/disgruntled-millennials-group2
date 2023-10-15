// WIP 
// postRoutes.js

const router = require('express').Router();
const { Post, User } = require('../../model');

// Route for text posts (no image)
router.post('/create-text-post', async (req, res) => {
  // Extract text content from the request body
  const { text } = req.body;

  // Create a new post record in the database
  Post.create({
    userName: 'User Name',
    text: text,
    user_id: 1, //IDK WHAT TO DO WITH THIS
  })
    .then((post) => {
      // Post creation successful
      // REDIRECT TO DASHBOARD...?
      res.redirect('/'); //
    })
    .catch((err) => {
      console.error('Error creating text post:', err);
      res.status(500).send('Error creating text post');

router.post('/', async (req, res) => {
  try {
    const homepage = Post.findAll({
      attributes: [
          "username",
          "text",
      ],
    })
    res.render('/homepage', {
      homepage,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

/*
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
});*/

router.post('/logout', async (req, res) => {
  if (req.session.logged_in) {
      req.session.destroy(() => {
          res.status(204).end();
      })
  } else {
      res.status(404).end();
  }
});

module.exports = router;