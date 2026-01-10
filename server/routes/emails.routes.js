const router = require('express').Router();
const sendmailController = require("../controller/sendmail.controller");
const {verifyToken} = require('../validations/customerValidation')

const multer = require('multer');
const upload = multer({ dest: '/tmp/uploads/' });


router.post("/send-emails", verifyToken, upload.single('csvFile'), sendmailController.sendEmails);


module.exports = router;