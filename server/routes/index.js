const express = require("express");
const sendController = require("./sendmail.js");
const multer = require('multer');


const upload = multer({ dest: '/tmp/uploads/' });
const router = express.Router();



router.use("/send-emails", upload.single('csvFile'), sendController.sendEmails);



module.exports = router;