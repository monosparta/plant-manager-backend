import { getContainers, getEmptyContainers } from '../services/container';
import { deletePlantByID, getPlant } from '../services/plant';
import { deleteRentById, getAllRentData, getRentById, getWaitingRentData, markContainerTaken } from '../services/rent';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import { createUser, destroyUserByID, getAdminList, getUserFromEmail, getUserFromID } from '../services/user';
import { createPassword } from '../services/randomPassword';
import { randomUUID } from 'crypto';
import { autoAssignContainer } from './rent';
import { validateEmail } from '../services/mailSender';
import { roles } from '../middlewares/permission';
import { sendAdminRegisterEmail } from '../services/mailTemplate';
import { updateMember } from '../services/memberShip';

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

const updateMemberRequest = async (req, res) => {
    await updateMember();

    return res.status(200).json({
        message: 'Update successful.'
    });
};

const getAdmins = async (req, res) => {
    const adminList = await getAdminList();

    return res.status(200).json({
        message: 'Query Success',
        data: adminList.map(item => {
            return {
                id: item.ID,
                name: item.Name,
                email: item.Email,
                isDefaultPassword: item.Is_Default_Password,
                role: item.Role
            };
        })
    });
};

const deleteAdmin = async (req, res) => {
    const own = await getUserFromID(req.userId);
    const user = await getUserFromID(req.params.id);

    if (!user || user.Role !== roles.admin) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    if (user.ID === own.ID) {
        return res.status(403).json({
            message: 'You are deleting yourself!'
        });
    }

    if (user.Email === 'root@rental.planter') {
        return res.status(403).json({
            message: 'Could not delete this admin'
        });
    }

    await destroyUserByID(user.ID);

    return res.status(200).json({
        message: 'Delete successful'
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
        message: 'Update successful'
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
        if (plant.Img_Path.startsWith('uploads/')) {
            if (existsSync(join('./public', plant.Img_Path))) {
                unlinkSync(join('./public', plant.Img_Path));
            }
        }
        deletePlantByID(plant.ID);
    }

    await deleteRentById(req.params.id);

    await autoAssignContainer();

    return res.status(200).json({
        message: 'Delete successful'
    });
};

const createAdminAccount = async (req, res) => {
    if (!req.body.email || !req.body.name) {
        // body invalid
        return res.status(400).json({
            message: 'Invalid body'
        });
    }
    if (!validateEmail(req.body.email)) {
        return res.status(400).json({
            message: 'Invalid email'
        });
    }

    const assigner = await getUserFromID(req.userId);

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
        roles.admin
    );

    sendAdminRegisterEmail(user.Email, assigner.Name, user.Name, password);

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
    createAdminAccount,
    updateMemberRequest,
    getAdmins,
    deleteAdmin
};
