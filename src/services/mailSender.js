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
    if (process.env.NODE_ENV !== 'production') {
        if (!existsSync('./mailWhitelist.json')) writeFileSync('./mailWhitelist.json', '[]');

        const mailWhiteList = JSON.parse(
            readFileSync('./mailWhitelist.json', { encoding: 'utf-8' })
        );
        if (!mailWhiteList.includes(to)) {
            console.log(
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
        if(err) console.log(err);
        // if(info) console.log(`Done sending!, time: ${timeStr}`, info);
    });
};

const validateEmail = (email) => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
};

export { sendMail, validateEmail };
