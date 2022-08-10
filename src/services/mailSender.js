import nodeMailer from 'nodemailer';

// create transporter for sending email
const transporter = nodeMailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

const autoSendMail = (to, subject, mailBody) =>{

    // mail setting variable
    const mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to, // list of recipients
        subject,
        html: mailBody
    };

    // call send email function
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) throw err;
        // if(info) console.log(`Done sending!, time: ${timeStr}`, info);
    });
};

export{
    autoSendMail
};
