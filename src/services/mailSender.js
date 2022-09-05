import nodeMailer from 'nodemailer';
import { readFileSync, existsSync, writeFileSync } from 'fs';

// create transporter for sending email
const transporter = nodeMailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendMail = (to, subject, mailBody) => {
    if (process.env.EMAIL_WHITELIST === '1') {
        if (!existsSync('./mailWhitelist.json')) writeFileSync('./mailWhitelist.json', '[]');

        const mailWhiteList = JSON.parse(
            readFileSync('./mailWhitelist.json', { encoding: 'utf-8' })
        );
        if (!mailWhiteList.includes(to)) {
            console.info(
                `To: ${to}\nSubject: ${subject}\nContent:\n${mailBody}`
            );
            return;
        }
    }

    // mail setting variable
    const mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to, // list of recipients
        subject,
        html: mailBody
    };

    // call send email function
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) console.error(err);
        if(info) console.info('Done sending!', { accepted: info.accepted, rejected: info.rejected });
    });
};

const validateEmail = (email) => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
};

export { sendMail, validateEmail };
