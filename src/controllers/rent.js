import { getEmptyContainers } from '../services/container';
import { assignContainer, getOtherUserRentData, insertRent } from '../services/rent';

const listOtherRents = async (req, res) => {
    res.status(200).json({
        message: 'Query Success',
        data: await getOtherUserRentData(req.user)
    });
};

const registerRent = async (req, res) => {
    const rent = await insertRent(req.user);

    // TODO: Auto assign container when avaliable
    const emptyContainers = await getEmptyContainers();
    if (emptyContainers.length !== 0) {
        await assignContainer(rent.ID, emptyContainers[0].id);
        // TODO: Send fill from email
    }

    res.status(200).json({
        message: 'Registration successful'
    });
};

const updatePlantInfo = (req, res) => {

};

export { listOtherRents, registerRent, updatePlantInfo };