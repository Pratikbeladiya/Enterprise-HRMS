const transporter = nodemailer.createTransport({
  host: '://example.com', 
  port: 465, // Use 465 for SSL or 587 for TLS
  secure: true, // true for 465, false for 587
  auth: {
    user: 'smtp-username',
    pass: 'smtp-password'
  }
});
