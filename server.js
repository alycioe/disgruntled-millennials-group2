const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const users = [];

app.post('/signup', (req, res) => {
  const { email, username, password, animalChoice} = req.body;

  const userExists = users.some(user => user.email === email || user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists '});
  }

  const newUser = { email, username, password, animalChoice };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
  const { loginIdentifier, loginPassword } = req.body;

  const user = users.find(user => user.email === loginIdentifier || user.username === loginIdentifier);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.password !== loginPassword) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  res.json({ message: 'Login successful' });
});
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
