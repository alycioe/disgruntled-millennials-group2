const router = require('express').Router();
const { User } = require('../../model');

app.post('/login', async (req, res) => {
    try {
        const { loginIdentifier, loginPassword } = req.body;
    
        const user = User.find(user => user.email === loginIdentifier || user.username === loginIdentifier);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
    
        if (User.password !== loginPassword) {
        return res.status(401).json({ message: 'Incorrect password' });
        }
    
        res.json({ message: 'Login successful' });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Successfully logged in!' });
        });

    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
  });

app.post('/signup', (req, res) => {
    const { email, username, password, animalChoice} = req.body;
  
    const userExists = User.some(user => user.email === email || user.username === username);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists '});
    }
  
    const newUser = { email, username, password, animalChoice };
    user.push(newUser);
  
    res.status(201).json({ message: 'User registered successfully' });
  });

app.get('/', (req, res) => {
    // THIS NEEDS TO BE DONE
    // USE res.render or res.sendFile
  });

// If a user logs out, it destroys the session and logs the user out. If unable to, throws a 404 error
router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;