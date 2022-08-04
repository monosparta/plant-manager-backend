import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserFromEmail } from '../services/user';
import { getRentData } from '../services/rent';

const login = async (req, res) => {
    if (req.body.account === undefined || req.body.password === undefined) {
        // body invalid
        return res.status(400).json({
            message: 'Invalid body'
        });
    }
    const email = req.body.account;
    const password = req.body.password;

    const user = await getUserFromEmail(email);
    // user not found
    if (user === null) {
        return res.status(401).json({
            message: 'Invalid user or password!'
        });
    }

    // check password
    const isValid = await bcrypt.compare(password, user.Password);
    if (!isValid) {
        return res.status(401).json({
            message: 'Invalid  user or Password!'
        });
    }

    // generate token
    const token = jwt.sign({ id: user.ID }, process.env.API_SECRECT, {
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

export { login };