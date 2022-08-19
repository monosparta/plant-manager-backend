import { getEmptyContainers } from '../services/container';
import { createPlant } from '../services/plant';
import { assignContainer, assignPlant, getOtherUserRentData, getRentById, getWaitingRents, insertRent } from '../services/rent';
import { join } from 'path';
import { unlinkSync, readFileSync } from 'fs';
import { getUserFromID } from '../services/user';
import { sendMail } from '../services/mailSender';

const listOtherRents = async (req, res) => {
    res.status(200).json({
        message: 'Query Success',
        data: await getOtherUserRentData(req.user)
    });
};

const registerRent = async (req, res) => {
    await insertRent(req.user);

    await autoAssignContainer();

    res.status(200).json({
        message: 'Registration successful'
    });
};

const autoAssignContainer = async () => {
    const waitingList = await getWaitingRents();

    const emptyContainers = await getEmptyContainers();
    if (emptyContainers.length !== 0 && waitingList.length !== 0) {
        let index = 0;
        for (const rent of waitingList) {
            const user = await getUserFromID(rent.User_ID);
            await assignContainer(rent.ID, emptyContainers[index++].id);

            const newRent = await getRentById(rent.ID);

            let expireDate = newRent.Rent_Time;
            expireDate.setDate(expireDate.getDate() + newRent.Deadline);
            const mailBody = readFileSync('template/assignContainer.html', 'utf8')
                .replace('{name}', user.Name)
                .replace('{expire}', expireDate.toLocaleDateString('zh-TW'));
            sendMail(
                user.Email,
                '【Monospace 植物租借管理系統】有新盆器可用',
                mailBody
            );

            if (index >= emptyContainers.length) break;
        }
    }
};

const updatePlantInfo = async (req, res) => {
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
    if (rent === null || rent.Container_ID === null || rent.User_ID !== req.user) {
        unlinkSync(req.file.path);
        return res.status(404).json({
            message: 'Requested rent not found'
        });
    }

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

export { listOtherRents, registerRent, updatePlantInfo, autoAssignContainer };