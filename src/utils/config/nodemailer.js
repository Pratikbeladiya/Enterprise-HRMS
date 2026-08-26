const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-16-character-app-password' 
  }
});

const mailOptions = {
  from: 'your-email@gmail.com',
  to: 'receiver@example.com',
  subject: 'Backend Test Email',
  text: 'Hello from your backend server!'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Email sent successfully:', info.response);
});
