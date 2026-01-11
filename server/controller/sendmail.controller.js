
const nodemailer = require('nodemailer');
const csvParser = require('csv-parser');
const fs = require('fs');
const emailTemplates = require('../email/emailTamplate');
const emailConfig = require('../email/emailConfig')
const xlsx = require('xlsx');


// Function to parse CSV files
exports.parseCSV = (csvPath, recipients) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(csvParser())
            .on('data', (row) => {
                console.log('Row data:', row); // Log the row to inspect its structure
                if (row.email) {
                    recipients.push(row.email);  // Push email if it exists in the 'email' column
                }
            })
            .on('end', () => {
                resolve(); // Resolve once CSV parsing is complete
            })
            .on('error', (err) => {
                reject(err); // Reject if there is an error parsing the file
            });
    });
}


// Function to parse Excel files
exports.parseExcel = (excelPath, recipients) => {
    const workbook = xlsx.readFile(excelPath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
    const data = xlsx.utils.sheet_to_json(sheet);

    data.forEach((row) => {
        if (row.email) {
            recipients.push(row.email); // Push email if it exists in the row
        }
    });
}


// Route to handle email sending
exports.sendEmails = async (req, res) => {
    try {


        const { template, limitOfRecipientsEmail } = req.body;

        const csvPath = req.file.path;

        const recipientsFromFile = [];


        const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

        if (fileExtension === 'csv') {
            // Parse CSV file
            await this.parseCSV(csvPath, recipientsFromFile);
        } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            // Parse Excel file
            await this.parseExcel(csvPath, recipientsFromFile);
        } else {
            return res.status(400).send('Invalid file format. Please upload a CSV or Excel file.');
        }



        // console.log(`Parsed CSV. Total recipients: ${recipients.length}`);
        // console.log("Recipients:", recipients);  // Displaying the recipients array in console



        // Send the bulk emails asynchronously        
        await this.sendBulkEmails(recipientsFromFile, template, limitOfRecipientsEmail);

        res.send('Emails sent successfully');
    } catch (err) {
        console.error('Error processing email sending:', err);
        res.status(500).send('Error sending emails: ' + err.message);
    }
};

// Function to send emails
exports.sendBulkEmails = async (recipientsFromFile, template, limitOfRecipientsEmail) => {
    try {
        // console.log(recipients)

        const transporter = nodemailer.createTransport(emailConfig);

        const limitedRecipients = recipientsFromFile.length >= limitOfRecipientsEmail ? recipientsFromFile.slice(0, limitOfRecipientsEmail) : recipientsFromFile;
        console.log(limitedRecipients.length, "limitedRecipients");

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

        for (const recipientEmail of limitedRecipients) {
            let mailOptions = emailTemplates.sendEmailTemplate(recipientEmail, template);
            await transporter.sendMail(mailOptions);

            console.log(`Email sent to: ${recipientEmail}`);
            await sleep(1500); // 1.5 seconds delay
        }
    } catch (err) {
        console.error(`Failed: ${recipientEmail}`, err.message);
        // throw new Error(err);
    }
}
