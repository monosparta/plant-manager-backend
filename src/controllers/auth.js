import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserFromEmail, createUser } from '../services/user';
import { getRentData } from '../services/rent';
import { createPassword } from '../services/randomPassword';
import { queryMember } from '../services/fakeMembership';

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
            phoneNumber: user.Phone_Number,
            isDefaultPassword: user.Is_Default_Password,
            role: user.Role
        },
        rents: await getRentData(user.ID)
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
        member.phoneNumber,
        0
    );

    // TODO: Send create password email
    console.log(user.Email);
    console.log(password);

    return res.status(200).json({
        message: 'Registration success'
    });
};

export { login, register };