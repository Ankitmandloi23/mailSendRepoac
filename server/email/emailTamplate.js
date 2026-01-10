const env = require("dotenv");
env.config();
exports.sendEmailTemplate = (recipientEmail, template) => {
  let subject = '';
  let html = '';


  // Switch case to handle different templates
  switch (template) {
    case 'launchTemplate':
      subject = 'frozaacart.com - We\’re Launching Soon';
      html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Frozaacart Launching Soon</title>
</head>

<body style="margin:0; padding:0; background-color:#f5f7fb; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 0;">

        <!-- MAIN CONTAINER -->
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#ffffff; border-radius:10px; overflow:hidden;
                      box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td align="center" style="padding:30px; background:#55a170;">
              <h1 style="margin:0; color:#ffffff; font-size:30px; letter-spacing:1px;">
                Frozaacart
              </h1>
              <p style="margin:8px 0 0; color:#eaf6f0; font-size:14px;">
                Your New Shopping Destination
              </p>
            </td>
          </tr>

          <!-- BODY CONTENT -->
          <tr>
            <td style="padding:30px; text-align:center;">
              <h2 style="color:#1f2937; font-size:24px; margin-bottom:12px;">
                🚀 We’re Launching Soon!
              </h2>

              <p style="color:#4b5563; font-size:16px; line-height:1.6; margin:0;">
                We’re excited to announce that
                <strong style="color:#55a170;">Frozaacart.com</strong>
                is going live very soon!
                <br><br>
                Get ready to explore trendy collections, premium products,
                and a smooth shopping experience designed just for you.
              </p>
            </td>
          </tr>

          <!-- OFFER BOX -->
          <tr>
            <td style="padding:0 30px 30px;">
              <div style="background:#eaf6f0; padding:20px; border-radius:8px;
                          border-left:5px solid #55a170; text-align:center;">
                <h3 style="margin:0; color:#166534; font-size:22px;">
                  🎉 Flat 30% OFF on Launch Day
                </h3>
                <p style="margin:10px 0 0; color:#166534; font-size:15px;">
                  Exclusive early-bird offer for our subscribers.
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA BUTTON -->
          <tr>
            <td align="center" style="padding-bottom:30px;">
              <a href="https://frozaacart.com"
                 style="background:#55a170; color:#ffffff; text-decoration:none;
                        padding:14px 32px; font-size:16px;
                        border-radius:6px; display:inline-block;
                        font-weight:bold;">
                Visit Frozaacart on Launch Day →
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9fafb; padding:20px; text-align:center;">
              <p style="margin:0; font-size:13px; color:#6b7280;">
                Stay tuned for Frozaacart updates.
              </p>
              <p style="margin:8px 0 0; font-size:13px; color:#6b7280;">
                © ${new Date().getFullYear()} Frozaacart.com • All rights reserved
              </p>
            </td>
          </tr>

        </table>
        <!-- END CONTAINER -->

      </td>
    </tr>
  </table>

</body>
</html>`;
      break;

    case 'notifyTemplate':
      subject = 'frozaacart.com - We\’re Launching Soon';
      html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Frozaacart Launching Soon</title>
</head>

<body style="margin:0; padding:0; background-color:#f5f7fb; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 0;">

        <!-- MAIN CONTAINER -->
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#ffffff; border-radius:10px; overflow:hidden;
                      box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td align="center" style="padding:30px; background:#55a170;">
              <h1 style="margin:0; color:#ffffff; font-size:30px; letter-spacing:1px;">
                Frozaacart
              </h1>
              <p style="margin:8px 0 0; color:#eaf6f0; font-size:14px;">
                Your New Shopping Destination
              </p>
            </td>
          </tr>

          <!-- BODY CONTENT -->
          <tr>
            <td style="padding:30px; text-align:center;">
              <h2 style="color:#1f2937; font-size:24px; margin-bottom:12px;">
                🚀 We’re Launching Soon!
              </h2>

              <p style="color:#4b5563; font-size:16px; line-height:1.6; margin:0;">
                We’re excited to announce that
                <strong style="color:#55a170;">Frozaacart.com</strong>
                is going live very soon!
                <br><br>
                Get ready to explore trendy collections, premium products,
                and a smooth shopping experience designed just for you.
              </p>
            </td>
          </tr>

          <!-- OFFER BOX -->
          <tr>
            <td style="padding:0 30px 30px;">
              <div style="background:#eaf6f0; padding:20px; border-radius:8px;
                          border-left:5px solid #55a170; text-align:center;">
                <h3 style="margin:0; color:#166534; font-size:22px;">
                  🎉 Flat 30% OFF on Launch Day
                </h3>
                <p style="margin:10px 0 0; color:#166534; font-size:15px;">
                  Exclusive early-bird offer for our subscribers.
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA BUTTON -->
          <tr>
            <td align="center" style="padding-bottom:30px;">
              <a href="https://frozaacart.com"
                 style="background:#55a170; color:#ffffff; text-decoration:none;
                        padding:14px 32px; font-size:16px;
                        border-radius:6px; display:inline-block;
                        font-weight:bold;">
                Visit Frozaacart on Launch Day →
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9fafb; padding:20px; text-align:center;">
              <p style="margin:0; font-size:13px; color:#6b7280;">
                Stay tuned for Frozaacart updates.
              </p>
              <p style="margin:8px 0 0; font-size:13px; color:#6b7280;">
                © ${new Date().getFullYear()} Frozaacart.com • All rights reserved
              </p>
            </td>
          </tr>

        </table>
        <!-- END CONTAINER -->

      </td>
    </tr>
  </table>

</body>
</html>`;
      break;

    default:
      console.log(template, 'default');
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
  //to: recipients.slice(0, recipientsCount).join(','),
  const data = {
    from: process.env.SMTP_USER,
    to: recipientEmail,
    subject: subject,
    html: html,
  };

  return data;
};
