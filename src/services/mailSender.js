const nodeMailer = require('nodemailer');
// const fs = require('fs');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
const timeStr = `${year}${month}${day}`;
console.log(timeStr);

// generate mail template
// let htmlMail = '';
// htmlMail += '<ol>';

// read mail content from file
// const mailContent = fs.readFileSync('./mailTemplate.txt', 'utf8')
//     .split('\r\n')
//     .filter(e => !e.startsWith('//'))
//     .map(line => `<li><p>${line}</p></li>`)
//     .join('');
// console.log(mailContent);

// htmlMail += mailContent;
// htmlMail += '</ol>';

// get all recipients
// const receivers = fs.readFileSync('./receivers.txt', 'utf8')
//     .split('\r\n')
//     .filter(e => !e.startsWith('//'))
//     .join(',');
// console.log(receivers);

// create transporter for sending email
const transporter = nodeMailer.createTransport({
    service: 'hotmail',
    auth: {
        user: '',
        pass: ''
    }
});

const mailOptions = {
    from: '',
    to: '', // list of receipients
    subject: 'test sending message',
    html: 'test body'
};


// send email
transporter.sendMail(mailOptions, (err, info) => {
    if(err) throw err;
    if(info) console.log(`Done sending!, time: ${timeStr}`, info);
});

console.log('finish');