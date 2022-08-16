import { getContainers, getEmptyContainers } from '../services/container';
import { deletePlantByID, getPlant } from '../services/plant';
import { deleteRentById, getAllRentData, getRentById, getWaitingRentData, markContainerTaken } from '../services/rent';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { createUser, getUserFromEmail } from '../services/user';
import { createPassword } from '../services/randomPassword';
import { randomUUID } from 'crypto';
import { autoAssignContainer } from './rent';

const getRentedList = async (req, res) => {
    return res.status(200).json({
        message: 'Query Success',
        data: await getAllRentData()
    });
};

const getWaitList = async (req, res) => {
    return res.status(200).json({
        message: 'Query Success',
        data: await getWaitingRentData()
    });
};

const getRentAmount = async (req, res) => {
    const containerCount = (await getContainers()).length;
    const emptyCount = (await getEmptyContainers()).length;

    return res.status(200).json({
        message: 'Query Success',
        data: {
            rented: containerCount - emptyCount,
            remain: emptyCount
        }
    });
};

const markRentTaken = async (req, res) => {
    const rent = await getRentById(req.params.id);

    if (!rent) {
        return res.status(404).json({
            message: 'Rent not found'
        });
    }

    if (rent.Get_Time) {
        return res.status(409).json({
            message: 'Rent already taken'
        });
    }

    await markContainerTaken(rent.ID);

    return res.status(200).json({
        message: 'Delete successful'
    });
};

const deleteRent = async (req, res) => {
    const rent = await getRentById(req.params.id);

    if (!rent) {
        return res.status(404).json({
            message: 'Rent not found'
        });
    }

    const plant = await getPlant(rent.Plant_ID);
    if (plant) {
        unlinkSync(join('public/', plant.Img_Path));
        deletePlantByID(plant.ID);
    }

    await deleteRentById(req.params.id);

    await autoAssignContainer();

    return res.status(200).json({
        message: 'Delete successful'
    });
};

const createAdminAccount = async (req, res) => {
    if (req.body.email === undefined || req.body.name === undefined) {
        // body invalid
        return res.status(400).json({
            message: 'Invalid body'
        });
    }
    const email = req.body.email;
    const username = req.body.name;

    const existUser = await getUserFromEmail(email);
    if (existUser) {
        return res.status(409).json({
            message: 'User already exist'
        });
    }
    const password = createPassword(8);
    const user = await createUser(
        randomUUID(),
        username,
        email,
        password,
        1
    );

    // TODO: Send create password email
    console.log(user.Email);
    console.log(password);

    return res.status(200).json({
        message: 'Registration success'
    });
};

export {
    getRentedList,
    getWaitList,
    getRentAmount,
    deleteRent,
    markRentTaken,
    createAdminAccount
};
