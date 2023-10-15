const router =  require('express').Router();

const userRoutes = require('./api/userRoutes');
const homepageRoutes = require('./api/postRoutes');

router.use('/signIn', userRoutes);
router.use('/homepage', homepageRoutes);

module.exports = router;