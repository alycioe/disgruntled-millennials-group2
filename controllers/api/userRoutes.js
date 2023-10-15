const router = require('express').Router();
const { User } = require('../../model');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: 
                Sequelize.or(
                    { email: req.body.email },
                    { username: req.body.username } 
                )
            });

            if (!userData) {
                res
                    .status(400)
                    .json({ message: 'Incorrect information entered '});
                return;
            }

        const validatePassword = await userData.checkPassword(req.body.password);

        if (!validatePassword) {
            res
                .status(400)
                .json({ message: 'Incorrect information entered '});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Logged in successfully! '});
        });

        res.redirect('/homepage');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { email, password, animalChoice } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: "test",
            email: email,
            password: hashedPassword,
            animalChoice: animalChoice,
        });

        res.status(201).json(newUser);
        res.redirect('/homepage');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create new user '});
    }
});



// DIFFERENT VERSION 

// app.post('/login', async (req, res) => {
//     try {
//         const { loginIdentifier, loginPassword } = req.body;
    
//         const user = User.find(user => user.email === loginIdentifier || user.username === loginIdentifier);
//         if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//         }
    
//         if (User.password !== loginPassword) {
//         return res.status(401).json({ message: 'Incorrect password' });
//         }
    
//         res.json({ message: 'Login successful' });

//         req.session.save(() => {
//             req.session.user_id = userData.id;
//             req.session.logged_in = true;

//             res.json({ user: userData, message: 'Successfully logged in!' });
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(400).json(err);
//     }
//   });

// app.post('/signup', (req, res) => {
//     const { email, username, password, animalChoice } = req.body;
  
//     const userExists = User.some(user => user.email === email || user.username === username);
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists '});
//     }
  
//     const newUser = { email, username, password, animalChoice };
//     user.push(newUser);
  
//     res.status(201).json({ message: 'User registered successfully' });
//   });


module.exports = router;