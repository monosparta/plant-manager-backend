import { getAllRentData } from '../services/rent';

const getRentedList = async (req, res) => {
    return res.status(200).json({
        message: 'Query Success',
        data: await getAllRentData()
    });
};

const getWaitList = (req, res) => { };

const getRentAmount = (req, res) => { };

const deleteRent = (req, res) => { };

export { getRentedList, getWaitList, getRentAmount, deleteRent };
