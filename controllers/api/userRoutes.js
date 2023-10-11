const router = require('express').Router();
const { User } = require('../../model');

// Portion of controller for logging in
router.post('/login', async (req, res) => {
    try {
        // Email that was input is searched within the model's user information
        const userData = await User.findOne({ where: { email: req.body.email } });

        // If no email is found, display message below
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email, please try again' });
            return;
        }

        // Validate a user's password matches the email it is connected to
        const validPassword = await userData.checkPassword(req.body.password);

        // If not valid, display message telling the user it is incorrect
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password, please try again' });
            return;
        }

        // Request session information then responds with successful login
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