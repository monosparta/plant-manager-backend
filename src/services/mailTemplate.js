import { readFileSync } from 'fs';
import { sendMail } from './mailSender';

let frontUrl = process.env.FRONT_URL;
/* istanbul ignore next */
if (!frontUrl) {
    if ((process.env.NODE_ENV || 'development') === 'development') {
        frontUrl = 'http://localhost:3000';
    }
}

const sendRegisterEmail = (email, username, password) => {
    const mailBody = readFileSync('template/register.html', 'utf8')
        .replace('{name}', username)
        .replace('{password}', password)
        .replace('{url}', `${frontUrl}/`);
    sendMail(email, '【Monospace 植物租借管理系統】建立帳號通知', mailBody);
};

const sendForgetPasswordEmail = (email, username, password) => {
    const mailBody = readFileSync('template/resetPassword.html', 'utf8')
        .replace('{name}', username)
        .replace('{password}', password)
        .replace('{url}', `${frontUrl}/`);
    sendMail(email, '【Monospace 植物租借管理系統】您的密碼已重設', mailBody);
};

const sendAdminRegisterEmail = (email, assigner, username, password) => {
    const mailBody = readFileSync('template/adminAdd.html', 'utf8')
        .replace('{name}', username)
        .replace('{assigner}', assigner)
        .replace('{url}', `${frontUrl}/`)
        .replace('{email}', email)
        .replace('{password}', password);
    sendMail(email, '【Monospace 植物租借管理系統】新增管理員通知', mailBody);
};

const sendRentAvailableEmail = (email, username, rentId, expire) => {
    const mailBody = readFileSync('template/assignContainer.html', 'utf8')
        .replace('{name}', username)
        .replace('{expire}', expire)
        .replace('{url}', `${frontUrl}/rentForm/${rentId}`);
    sendMail(email, '【Monospace 植物租借管理系統】有新盆器可用', mailBody);
};

export {
    sendRegisterEmail,
    sendForgetPasswordEmail,
    sendAdminRegisterEmail,
    sendRentAvailableEmail
};