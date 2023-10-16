const router = require('express').Router();
const{ User, Post } = require('../model');

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

  // This sends the user to the login page at /signup
  router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    layout: 'main',
    });
 });

 router.get('/', (req, res) => {
  res.render('login', {
    layout: 'main',
    });
 });