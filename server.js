const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');  // Multer for handling file uploads
const routes = require('./controllers');
const { POST } = require('./model');

const app = express();
const PORT = process.env.PORT || 3001;


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
