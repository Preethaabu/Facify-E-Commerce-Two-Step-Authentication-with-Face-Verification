const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.post('/send-email', async (req, res) => {
  try {
    const { recipient, subject, htmlContent } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'feroz1522krish@gmail.com',
        pass: 'hkffsdjsfuvonzmo'
      }
    });

    
    const mailOptions = {
      from: 'feroz1522krish@gmail.com',
      to: recipient,
      subject: subject,
      html: htmlContent
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
});

// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
