const router =  require('express').Router();

const userRoutes = require('../model/User');
const homepageRoutes = require('../model/Posts');

router.use('/signIn', userRoutes);
router.use('/homepage', homepageRoutes);

module.exports = router;