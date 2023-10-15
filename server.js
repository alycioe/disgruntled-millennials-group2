const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');  // Multer for handling file uploads
const { POST } = require('./model');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'myLInne14L5', // just a pun on the word millennials
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const hbs = exphbs.create();

app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
