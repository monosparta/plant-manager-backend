import { getEmptyContainers } from '../services/container';
import { createPlant } from '../services/plant';
import { assignContainer, assignPlant, getOtherUserRentData, getRentById, getWaitingRents, insertRent } from '../services/rent';
import { join } from 'path';
import { unlinkSync } from 'fs';
import { getUserFromID } from '../services/user';
import { sendRentAvailableEmail } from '../services/mailTemplate';
import { getDeadline } from '../services/config';

const listOtherRents = async (req, res) => {
    res.status(200).json({
        message: 'Query Success',
        data: await getOtherUserRentData(req.userId)
    });
};

const registerRent = async (req, res) => {
    const insertedRent = await insertRent(req.userId);

    await autoAssignContainer();

    res.status(200).json({
        message: 'Registration successful',
        waiting: (await getRentById(insertedRent.ID)).Container_ID === null
    });
};

const autoAssignContainer = async () => {
    const waitingList = await getWaitingRents();

    const emptyContainers = await getEmptyContainers();
    if (emptyContainers.length !== 0 && waitingList.length !== 0) {
        let index = 0;
        for (const rent of waitingList) {
            const user = await getUserFromID(rent.User_ID);
            await assignContainer(rent.ID, emptyContainers[index++].id, getDeadline());

            const newRent = await getRentById(rent.ID);

            let expireDate = newRent.Rent_Time;
            expireDate.setDate(expireDate.getDate() + newRent.Deadline);

            sendRentAvailableEmail(
                user.Email,
                user.Name,
                rent.ID,
                expireDate.toLocaleDateString('zh-TW')
            );

            if (index >= emptyContainers.length) break;
        }
    }
};

const updatePlantInfo = async (req, res) => {
    if (
        !req.file ||
        !req.body.rent ||
        !req.body.name ||
        !req.body.intro ||
        !req.body.nickname ||
        !req.body.minHumid
    ) {
        // delete file because of failure
        if (req.file) unlinkSync(req.file.path);
        return res.status(400).json({
            message: 'Invalid body'
        });
    }
    const rent = await getRentById(parseInt(req.body.rent));
    if (!rent || !rent.Container_ID || rent.User_ID !== req.userId) {
        unlinkSync(req.file.path);
        return res.status(404).json({
            message: 'Requested rent not found'
        });
    }

    if (rent.Plant_ID) {
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

export { listOtherRents, registerRent, updatePlantInfo, autoAssignContainer };