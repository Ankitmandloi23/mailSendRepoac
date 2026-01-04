
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
exports.sendEmails = async (req,res) => {
    try {


        const { template, recipientsCount } = req.body;
        
        const csvPath = req.file.path;

        const recipients = [];


        const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

        if (fileExtension === 'csv') {
            // Parse CSV file
            await this.parseCSV(csvPath, recipients);
        } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            // Parse Excel file
            await this.parseExcel(csvPath, recipients);
        } else {
            return res.status(400).send('Invalid file format. Please upload a CSV or Excel file.');
        }



        // console.log(`Parsed CSV. Total recipients: ${recipients.length}`);
        // console.log("Recipients:", recipients);  // Displaying the recipients array in console



        // Send the bulk emails asynchronously
       await this.sendBulkEmails(recipients, template, recipientsCount);

        res.send('Emails sent successfully');
    } catch (err) {
        console.error('Error processing email sending:', err);
        res.status(500).send('Error sending emails: ' + err.message);
    }
};

// Function to send emails
exports.sendBulkEmails = async (recipients, template, recipientsCount) => {
    try {
        // console.log(recipients)

        const transporter = nodemailer.createTransport(emailConfig);


        let mailOptions = emailTemplates.sendEmailTemplate(recipients, template, recipientsCount);


        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (e) {
        console.log("some error", e);
        throw new Error(e);
    }
}
