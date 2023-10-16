const router = require('express').Router();
const{ User, Post } = require('../model');
const Auth = require('../utils/auth');

// If not logged in, directs user to login before viewing homepage.
// If logged in, homepage is displayed

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;
  
  // This sends the user to the signup page at the root
  router.get('/signup', (req, res) => {
  res.render('signup', {
    layout: 'main',
    });
 });

 // This sends the user to the login page at /login
 router.get('/login', (req, res) => {
  res.render('login', {
  layout: 'main',
  });
 });

//   // This sends the user to the login page at /signup
//   router.get('/dashboard', Auth ,(req, res) => {
//   res.render('dashboard', {
//     layout: 'main',
//     });
//  });

 router.get('/dashboard', Auth ,async (req, res) => {
  try {

    const postsdata = await Post.findAll({
      
          attributes: ['userName' , 'text'],

    });

        // Serialize data so the template can read it
        const posts = postsdata.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

 router.get('/', (req, res) => {
  res.render('login', {
    layout: 'main',
    });
 });