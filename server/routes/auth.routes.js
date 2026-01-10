const router = require('express').Router();
const authcontroller = require('../controller/auth.controller')



// router.post('/signup', authcontroller.signup);
router.post('/login', authcontroller.login);

module.exports = router;