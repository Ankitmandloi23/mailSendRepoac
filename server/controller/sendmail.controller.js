
const nodemailer = require('nodemailer');
const csvParser = require('csv-parser');
const fs = require('fs');
const emailTemplates = require('../email/emailTamplate');
const emailConfig = require('../email/emailConfig')
const xlsx = require('xlsx');





const EmailProgress = require('../model/emailProgress.model');

const getFileHash = require('../utils/fileHash');
const sleep = require('../utils/sleep');


// Function to parse CSV files
// exports.parseCSV = (csvPath, recipients) => {
//     return new Promise((resolve, reject) => {
//         fs.createReadStream(csvPath)
//             .pipe(csvParser())
//             .on('data', (row) => {
//                 console.log('Row data:', row); // Log the row to inspect its structure
//                 if (row.email) {
//                     recipients.push(row.email);  // Push email if it exists in the 'email' column
//                 }
//             })
//             .on('end', () => {
//                 resolve(); // Resolve once CSV parsing is complete
//             })
//             .on('error', (err) => {
//                 reject(err); // Reject if there is an error parsing the file
//             });
//     });
// }


// // Function to parse Excel files
// exports.parseExcel = (excelPath, recipients) => {
//     const workbook = xlsx.readFile(excelPath);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
//     const data = xlsx.utils.sheet_to_json(sheet);

//     data.forEach((row) => {
//         if (row.email) {
//             recipients.push(row.email); // Push email if it exists in the row
//         }
//     });
// }


// Route to handle email sending
// exports.sendEmails = async (req, res) => {
//     try {


//         const { template, limitOfRecipientsEmail } = req.body;

//         const csvPath = req.file.path;

//         const recipientsFromFile = [];


//         const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

//         if (fileExtension === 'csv') {
//             // Parse CSV file
//             await this.parseCSV(csvPath, recipientsFromFile);
//         } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
//             // Parse Excel file
//             await this.parseExcel(csvPath, recipientsFromFile);
//         } else {
//             return res.status(400).send('Invalid file format. Please upload a CSV or Excel file.');
//         }



//         // console.log(`Parsed CSV. Total recipients: ${recipients.length}`);
//         // console.log("Recipients:", recipients);  // Displaying the recipients array in console



//         // Send the bulk emails asynchronously        
//         await this.sendBulkEmails(recipientsFromFile, template, limitOfRecipientsEmail);

//         res.send('Emails sent successfully');
//     } catch (err) {
//         console.error('Error processing email sending:', err);
//         res.status(500).send('Error sending emails: ' + err.message);
//     }
// };

// // Function to send emails
// exports.sendBulkEmails = async (recipientsFromFile, template, limitOfRecipientsEmail) => {
//     try {
//         // console.log(recipients)

//         const transporter = nodemailer.createTransport(emailConfig);

//         const limitedRecipients = recipientsFromFile.length >= limitOfRecipientsEmail ? recipientsFromFile.slice(0, limitOfRecipientsEmail) : recipientsFromFile;
//         console.log(limitedRecipients.length, "limitedRecipients");

//         const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//         for (const recipientEmail of limitedRecipients) {
//             let mailOptions = emailTemplates.sendEmailTemplate(recipientEmail, template);
//             await transporter.sendMail(mailOptions);

//             console.log(`Email sent to: ${recipientEmail}`);
//             await sleep(1500); // 1.5 seconds delay
//         }
//     } catch (err) {
//         console.error(`Failed: ${recipientEmail}`, err.message);
//         // throw new Error(err);
//     }
// }



// ---------- CSV PARSER ----------
const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const recipients = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', row => {
        if (row.email) recipients.push(row.email);
      })
      .on('end', () => resolve(recipients))
      .on('error', reject);
  });
};

// ---------- EXCEL PARSER ----------
const parseExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  return data
    .filter(row => row.email)
    .map(row => row.email);
};

// ---------- SEND EMAIL API ----------
exports.sendEmails = async (req, res) => {
  try {
    const { template } = req.body;
    const limit = Number(req.body.limitOfRecipientsEmail) || 200;
    const filePath = req.file.path;

    const fileExt = req.file.originalname.split('.').pop().toLowerCase();

    let recipients = [];
    if (fileExt === 'csv') {
      recipients = await parseCSV(filePath);
    } else if (fileExt === 'xlsx' || fileExt === 'xls') {
      recipients = parseExcel(filePath);
    } else {
      return res.status(400).send('Invalid file format');
    }

    const fileHash = getFileHash(filePath);

    let progress = await EmailProgress.findOne({ fileHash });
    if (!progress) {
      progress = await EmailProgress.create({
        fileHash,
        totalEmails: recipients.length,
      });
    }

    await sendBulkEmails(recipients, template, limit, progress);

    res.json({
      message: 'Email sending started/resumed',
      sentTill: progress.lastSentIndex
    });

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// ---------- BULK EMAIL SENDER ----------
const sendBulkEmails = async (recipients, template, limit, progress) => {

  const transporter = nodemailer.createTransport(emailConfig);

  const start = progress.lastSentIndex;
  const end = Math.min(start + limit, recipients.length);

  for (let i = start; i < end; i++) {
    const email = recipients[i];

    try {
      const mailOptions = emailTemplates.sendEmailTemplate(email, template);
       await transporter.sendMail(mailOptions);

      progress.lastSentIndex = i + 1;
      progress.status = 'in-progress';
      await progress.save();

      console.log(`✅ Sent ${i + 1}: ${email}`);

      await sleep(1500); // RATE LIMIT

    } catch (err) {
      console.error(`❌ Failed at ${i + 1}`, err.message);
      break;
    }
  }

  if (progress.lastSentIndex === recipients.length) {
    progress.status = 'completed';
    await progress.save();
    console.log('🎉 All emails sent');
  }
};