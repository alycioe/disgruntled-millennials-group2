const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');  // Multer for handling file uploads
const { POST } = require('./models');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(routes);
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


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
  res.render('login');
})

app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
