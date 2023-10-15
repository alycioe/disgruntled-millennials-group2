// WIP 
// postRoutes.js

const router = require('express').Router();
const { Post } = require('../../model');
const fs = require('fs');

// Route for text posts (no image)
router.post('/create-text-post', async (req, res) => {

  // Extract text content from the request body

  const newPost = req.body;

  fs.readFile('./seeds/postData.json', 'utf8', async (err, data) => {

    if (err) {

      console.error(err);

  } else {

      // Convert string into JSON object

      const parsedPosts = JSON.parse(data);

      // Add a new note

        var post = await Post.create({

          userName : newPost.userName,

          text : newPost.text
          
        })

      .then(() => {

        console.log(JSON.stringify(post))

        parsedPosts.push(newPost);

        // Write updated reviews back to the file

        fs.writeFile('./seeds/postData.json', JSON.stringify(parsedPosts, null, 4),(writeErr) =>

          writeErr

            ? console.error(writeErr)

            : console.info('Successfully updated Posts!')


      )

        // Post creation successful
        // REDIRECT TO DASHBOARD...?

        res.redirect('/dashboard'); //

      })
      
      .catch((err) => {
        console.error('Error creating text post:', err);
        res.status(500).send('Error creating text post');
      })

    }

});

});

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