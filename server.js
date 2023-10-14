const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');  // Multer for handling file uploads
const { POST } = require('./model');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

// MAKE SURE TO INSTALL EXPRESS-HANDLEBARS
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');


app.get('/login', (req, res) => {
  //res.sendFile(path.join(__dirname, '/views/login.html'))
  res.render('login', {
  layout: 'main',
  });
 });

 app.get('/signup', (req, res) => {
  //res.sendFile(path.join(__dirname, '/views/signup.html'))
  res.render('signup', {
    layout: 'main',
    });
 });

 app.get('/dashboard', (req, res) => {
  //res.sendFile(path.join(__dirname, '/views/signup.html'))
  res.render('dashboard', {
    layout: 'main',
    });
 });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
