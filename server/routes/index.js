const express = require("express");
const router = express.Router();
const authRoutes = require('./auth.routes.js');
const emailRoutes = require('./emails.routes.js');




router.use('/auth', authRoutes);
router.use('/emails', emailRoutes);




module.exports = router;