import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
const router = express.Router();
import db from '../db/models';

/* GET users data */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

/* POST request Login*/
router.post('/', async (req, res)=>  {
    if (req.body.account === undefined || req.body.password === undefined) {
        return res.status(400)
            .send({
                message: 'Invalid body'
            });
    } 
    const email = req.body.account;
    const password = req.body.password;

    const user = await db.User.findOne({ where: { Email: email } });
    if (user === null) {
        return res.status(401)
            .send({
                message:'Unknown user'
            });
    }

    const isValid = await bcrypt.compare(password, user.Password);
    if (!isValid) {
        return res.status(401)
            .send({
                message: 'Invalid Password!'
            });
    }

    const token = jwt.sign(
        { id: user.ID },
        process.env.API_SECRECT,
        { expiresIn: '1h' }
    );

    const rents = await db.Rent.findAll({ where: { User_ID: user.ID } });

    const rentsResponse = [];
    for (const rent of rents) {
        const plant = (rent !== null) ? await db.Plant.findOne({ where: { ID: rent.Plant_ID } }) : null;
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
    

    res.status(200)
        .send({
            message: 'Login success',
            token,
            user: {
                id: user.ID,
                name: user.Name,
                email: user.Email,
                card: user.Card,
                phoneNumber: user.Phone_Number
            },
            rents
        });
});

export default router;
