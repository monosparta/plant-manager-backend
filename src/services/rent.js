/* eslint-disable camelcase */
import db from '../db/models';
import { getPlant } from './plant';
import { Op } from 'sequelize';

/* Get rent data from user GET users data */
const getUserRentData = async userId => {
    const rents = await getUserRents(userId);

    return getRentData(rents);
};

const getOtherUserRentData = async userId => {
    const rents = await getOtherUserRents(userId);

    return getRentData(rents);
};

const getRentData = async rents => {
    const rentsData = [];
    for (const rent of rents) {
        const plant = await getPlant(rent.Plant_ID);

        rentsData.push({
            id: rent.ID,
            plant: (plant !== null) ? {
                name: plant.Name,
                intro: plant.Intro,
                imgPath: plant.Img_Path,
                nickName: plant.Nickname,
                minHumid: plant.Min_Humid
            } : null,
            container: rent.Container_ID
        });
    }

    return rentsData;
};


const getUserRents = userId => db.Rent.findAll({ where: { User_ID: userId } });

const getOtherUserRents = userId =>
    db.Rent.findAll({
        where: { User_ID: { [Op.ne]: userId } }
    });

const insertRent = userId =>
    db.Rent.create({
        User_ID: userId,
        Register_Time: new Date()
    });

const assignContainer = (ID, containerId, deadline = 5) =>
    db.Rent.update({
        Container_ID: containerId,
        Rent_Time: new Date(),
        Deadline: deadline
    }, { where: { ID } });

const assignPlant = (ID, plantId) =>
    db.Rent.update({
        Plant_ID: plantId
    }, { where: { ID } });

export {
    getUserRentData,
    getUserRents,
    getOtherUserRentData,
    insertRent,
    assignContainer,
    assignPlant
};