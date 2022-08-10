import { getEmptyContainers } from '../services/container';
import { createPlant } from '../services/plant';
import { assignContainer, assignPlant, getOtherUserRentData, getRentById, insertRent } from '../services/rent';
import { join } from 'path';
import { unlinkSync } from 'fs';

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

const updatePlantInfo = async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    if (
        req.file === undefined ||
        req.body.rent === undefined ||
        req.body.name === undefined ||
        req.body.intro === undefined ||
        req.body.nickname === undefined ||
        req.body.minHumid === undefined
    ) {
        // delete file because of failure
        if (req.file) unlinkSync(req.file.path);
        return res.status(400).json({
            message: 'Invalid body'
        });
    }
    const rent = await getRentById(parseInt(req.body.rent));
    if (rent === null || rent.Container_ID === null) {
        unlinkSync(req.file.path);
        return res.status(404).json({
            message: 'Requested rent not found'
        });
    }

    // TODO: To be discussed
    if (rent.Plant_ID !== null) {
        unlinkSync(req.file.path);
        return res.status(409).json({
            message: 'Plant already exist'
        });
    }

    const plant = await createPlant(
        req.body.name,
        req.body.intro,
        join('uploads/', req.file.filename),
        req.body.nickname,
        parseInt(req.body.minHumid)
    );

    await assignPlant(parseInt(req.body.rent), plant.ID);
    res.status(200).json({
        message: 'Update successful'
    });
};

export { listOtherRents, registerRent, updatePlantInfo };