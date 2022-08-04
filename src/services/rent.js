import db from '../db/models';
import { getPlant } from './plant';

/* Get rent data from user GET users data */
const getRentData = async (userId) => {
    const rents = await getUserRents(userId);

    const rentsResponse = [];
    for (const rent of rents) {
        const plant = await getPlant(rent.Plant_ID);

        rentsResponse.push({
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

    return rentsResponse;
};

const getUserRents = userId => db.Rent.findAll({ where: { User_ID: userId } });

export { getRentData, getUserRents };