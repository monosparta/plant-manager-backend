import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserFromEmail, createUser, updatePassword } from '../services/user';
import { getUserRentData } from '../services/rent';
import { createPassword } from '../services/randomPassword';
import { queryMember } from '../services/fakeMembership';
import { sendMail } from '../services/mailSender';
import { readFileSync } from 'fs';

const login = async (req, res) => {
    if (req.body.email === undefined || req.body.password === undefined) {
        // body invalid
        return res.status(400).json({
            message: 'Invalid body'
        });
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await getUserFromEmail(email);
    // user not found
    if (!user) {
        return res.status(401).json({
            message: 'Invalid user or password!'
        });
    }

    // check password
    const isValid = await bcrypt.compare(password, user.Password);
    if (!isValid) {
        return res.status(401).json({
            message: 'Invalid user or password!'
        });
    }

    // generate token
    const token = jwt.sign({ id: user.ID }, process.env.JWT_SECRECT, {
        expiresIn: '1h'
    });

    res.status(200).json({
        message: 'Login success',
        token,
        user: {
            id: user.ID,
            name: user.Name,
            email: user.Email,
            isDefaultPassword: user.Is_Default_Password,
            role: user.Role
        },
        rents: await getUserRentData(user.ID)
    });
};

const register = async (req, res) => {
    if (req.body.email === undefined) {
        // body invalid
        return res.status(400).json({
            message: 'Invalid body'
        });
    }
    const email = req.body.email;

    const existUser = await getUserFromEmail(email);
    if (existUser) {
        return res.status(409).json({
            message: 'User already exist'
        });
    }

    // TODO: Query monospace member
    const member = queryMember(email);
    if (!member) {
        return res.status(404).json({
            message: 'Membership not found'
        });
    }

    const password = createPassword(8);
    const user = await createUser(
        member.ID,
        member.name,
        member.email,
        password,
        0
    );

    const mailBody = readFileSync('template/register.html', 'utf8').replace('{password}', password);
    sendMail(user.Email, '植物租借管理系統:建立帳號通知信件', mailBody);


    return res.status(200).json({
        message: 'Registration success'
    });
};


const requestChangePassword = async (req, res) => {
    if (req.body.email === undefined) {
        // body invalid
        return res.status(400).json({
            message: 'Invalid body'
        });
    }
    const email = req.body.email;

    const user = await getUserFromEmail(email);
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    const password = createPassword(8);
    await updatePassword(user.ID, password, true);

    const mailBody = readFileSync('template/resetPassword.html', 'utf8').replace('{password}', password);
    sendMail(user.Email, '植物租借管理系統:重設密碼', mailBody);
    return res.status(200).json({
        message: 'Request success'
    });
};

const changePassword = async (req, res) => {
    if (req.body.password === undefined) {
        // body invalid
        return res.status(400).json({
            message: 'Invalid body'
        });
    }
    await updatePassword(req.user, req.body.password);

    return res.status(200).json({
        message: 'Password updated'
    });
};

export {
    login,
    register,
    changePassword as updatePassword,
    requestChangePassword
};