require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((error, success) => {

    if (error) {

        console.log('Email server error:', error);

    } else {

        console.log('Email server is ready to send messages');
    }
});

const sendEmail = async ({ to, subject, text, html }) => {

    try {

        const info = await transporter.sendMail({
            from: `"LedgerFlow" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });

        console.log('Message sent:', info.messageId);

        return info;

    } catch (error) {

        console.log('Error sending email:', error);

        throw error;
    }
};

const sendWelcomeEmail = async (userEmail, name) => {

    const subject = 'Welcome to LedgerFlow';

    const text = `
Hi ${name},

Welcome to LedgerFlow!

Your account has been created successfully.

Best Regards,
LedgerFlow Team
`;

    const html = `
        <h2>Welcome to LedgerFlow</h2>

        <p>Hi ${name},</p>

        <p>Your account has been created successfully.</p>

        <p>We are excited to have you onboard.</p>

        <br>

        <p>Best Regards,</p>
        <p>LedgerFlow Team</p>
    `;

    await sendEmail({
        to: userEmail,
        subject,
        text,
        html
    });
};

module.exports = {
    sendEmail,
    sendWelcomeEmail
};