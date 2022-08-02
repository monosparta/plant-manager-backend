import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
const router = express.Router();

import db from '../db/models';
import verifyToken from '../middlewares/authJWT';

/* Get rent data from user GET users data */
const getRentData = async (user) => {
    const rents = await db.Rent.findAll({ where: { User_ID: user.ID } });

    const rentsResponse = [];
    for (const rent of rents) {
        const plant = rent !== null ? await db.Plant.findOne({ where: { ID: rent.Plant_ID } }) : null;

        rentsResponse.push({
            plant: {
                id: plant.ID,
                name: plant.Name,
                intro: plant.Intro,
                imgPath: plant.Img_Path,
                nickName: plant.Nickname,
                minHumid: plant.Min_Humid,
            },
            container: rent.Container_ID,
        });
    }

    return rentsResponse;
};

/* GET users data */
router.get('/', verifyToken, async (req, res) => {
    // token verify fail
    if (!req.user) {
        return res.status(401).json({
            message: 'Invalid JWT token',
        });
    }

    res.status(200)
        .json({
            message: 'Query Success',
            user: {
                id: req.user.ID,
                name: req.user.Name,
                email: req.user.Email,
                card: req.user.Card,
                phoneNumber: req.user.Phone_Number
            },
            rents: await getRentData(req.user)
        });

});

/* POST request Login*/
router.post('/', async (req, res)=>  {
    if (req.body.account === undefined || req.body.password === undefined) {
    // body invalid
        return res.status(400).json({
            message: 'Invalid body',
        });
    }
    const email = req.body.account;
    const password = req.body.password;

    const user = await db.User.findOne({ where: { Email: email } });
    // user not found
    if (user === null) {
        return res.status(401).json({
            message: 'Invalid user or password!',
        });
    }

    // check password
    const isValid = await bcrypt.compare(password, user.Password);
    if (!isValid) {
        return res.status(401).json({
            message: 'Invalid  user or Password!',
        });
    }

    // generate token
    const token = jwt.sign({ id: user.ID }, process.env.API_SECRECT, {
        expiresIn: '1h',
    });

    res.status(200).json({
        message: 'Login success',
        token,
        user: {
            id: user.ID,
            name: user.Name,
            email: user.Email,
            card: user.Card,
            phoneNumber: user.Phone_Number,
        },
        rents: await getRentData(user),
    });
});

export default router;
