import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserFromEmail, createUser, updatePassword } from '../services/user';
import { getUserRentData } from '../services/rent';
import { createPassword } from '../services/randomPassword';
import { queryMember } from '../services/memberShip';
import { roles } from '../middlewares/permission';
import { sendForgetPasswordEmail, sendRegisterEmail } from '../services/mailTemplate';

const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        // body invalid
        return res.status(400).json({
            message: 'Invalid body'
        });
    }

    const { email, password } = req.body;

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
    if (!req.body.email) {
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

    const member = queryMember(email);
    if (!member) {
        return res.status(404).json({
            message: 'Membership not found'
        });
    }

    const password = createPassword(8);
    const user = await createUser(
        member.uuid,
        member.name,
        member.email,
        password,
        roles.user
    );

    sendRegisterEmail(user.Email, user.Name, password);

    return res.status(200).json({
        message: 'Registration success'
    });
};

// User request password change via forget password
const requestChangePassword = async (req, res) => {
    if (!req.body.email) {
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

    sendForgetPasswordEmail(user.Email, user.Name, password);

    return res.status(200).json({
        message: 'Request success'
    });
};

// User change the password
const changePassword = async (req, res) => {
    if (!req.body.password) {
        // body invalid
        return res.status(400).json({
            message: 'Invalid body'
        });
    }
    await updatePassword(req.userId, req.body.password);

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