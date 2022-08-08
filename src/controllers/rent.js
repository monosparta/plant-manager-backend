import { getOtherUserRentData } from '../services/rent';


const listOtherRents = async (req, res) => {
    res.status(200).json({
        message: 'Query Success',
        data: await getOtherUserRentData(req.user)
    });
};

const registerRent = (req, res) => {

};

const updatePlantInfo = (req, res) => {

};

export { listOtherRents, registerRent, updatePlantInfo };