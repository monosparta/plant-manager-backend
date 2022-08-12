import { getContainers, getEmptyContainers } from '../services/container';
import { deletePlantByID, getPlant } from '../services/plant';
import { deleteRentById, getAllRentData, getRentById, getWaitingRentData, markContainerTaken } from '../services/rent';
import { unlinkSync } from 'fs';
import { join } from 'path';

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

    return res.status(200).json({
        message: 'Delete successful'
    });
};

export { getRentedList, getWaitList, getRentAmount, deleteRent, markRentTaken };
