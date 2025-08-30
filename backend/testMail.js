require('dotenv').config();
const nodemailer = require('nodemailer');

(async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,     
    port: Number(process.env.SMTP_PORT), 
    secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.verify(); 
  await transporter.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: process.env.STUDIO_EMAIL || process.env.SMTP_USER, 
    subject: 'Test from booking-app',
    text: 'Hello! Gmail app password works ✅',
  });

  console.log('✅ test mail sent');
})();