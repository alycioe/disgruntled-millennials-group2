const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');  // Multer for handling file uploads
const { POST } = require('./model');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

//you can delete these limes 12 - 20 just so you can see the log in / sign up page 

app.get('/login', async (req, res) => {
  res.sendFile(path.join(__dirname, '/views/login.html'))
 });

 app.get('/signup', async (req, res) => {
  res.sendFile(path.join(__dirname, '/views/signup.html'))
 });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);


app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
