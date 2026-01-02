const env = require("dotenv");
env.config();
exports.sendEmailTemplate = (recipients, template, recipientsCount) => {
  let subject = '';
  let html = '';

  // Switch case to handle different templates
  switch (template) {
    case 'templateOne':
      subject = 'Template One - Your Design has been updated!';
      html = `
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4;">
          <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td style="padding: 20px 0;">
                <img src="https://via.placeholder.com/150" alt="Template One Logo" style="display: block; margin: 0 auto; width: 150px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <h1 style="color: #333;">Welcome to Template One</h1>
                <p>Your design has been updated. Please check the latest changes.</p>
              </td>
            </tr>
          </table>
        </body>
      `;
      break;

    case 'templateTwo':
      subject = 'Template Two - Your Design has been updated!';
      html = `
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9;">
          <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td style="padding: 20px 0;">
                <img src="https://via.placeholder.com/150" alt="Template Two Logo" style="display: block; margin: 0 auto; width: 150px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <h1 style="color: #333;">Hello from Template Two</h1>
                <p>Your design has been updated. Here are the details of the changes:</p>
                <ul>
                  <li>Change 1: New feature added</li>
                  <li>Change 2: Bug fixes applied</li>
                  <li>Change 3: UI improvements</li>
                </ul>
              </td>
            </tr>
          </table>
        </body>
      `;
      break;

    case 'templateThree':
      subject = 'Template Three - Your Design has been updated!';
      html = `
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333; background-color: #e9ecef;">
          <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td style="padding: 20px 0;">
                <img src="https://via.placeholder.com/150" alt="Template Three Logo" style="display: block; margin: 0 auto; width: 150px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <h1 style="color: #333;">Welcome to Template Three</h1>
                <p>Your design has been updated. We have made significant changes:</p>
                <p>These updates should enhance your user experience.</p>
              </td>
            </tr>
          </table>
        </body>
      `;
      break;

    case 'templateFour':
      subject = 'Template Four - Your Design has been updated!';
      html = `
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333; background-color: #ffffff;">
          <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td style="padding: 20px 0;">
                <img src="https://via.placeholder.com/150" alt="Template Four Logo" style="display: block; margin: 0 auto; width: 150px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <h1 style="color: #333;">Template Four Updates</h1>
                <p>We are happy to announce the latest changes to your design:</p>
                <ol>
                  <li>UI improvements</li>
                  <li>Bug fixes</li>
                  <li>Feature enhancements</li>
                </ol>
                <p>Enjoy the new design!</p>
              </td>
            </tr>
          </table>
        </body>
      `;
      break;

    default:
      subject = 'Default Template - Your Design has been updated!';
      html = `
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4;">
          <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td style="padding: 20px 0;">
                <img src="https://via.placeholder.com/150" alt="Default Logo" style="display: block; margin: 0 auto; width: 150px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <h1 style="color: #333;">Your Design has been updated!</h1>
                <p>Your design has been successfully updated. Check out the latest improvements.</p>
              </td>
            </tr>
          </table>
        </body>
      `;
      break;
  }

  // Returning the email data for sending
  const data = {
    from: process.env.SMTP_USER,
    to: recipients.slice(0, recipientsCount).join(','),
    subject: subject,
    html: html,
  };

  return data;
};
