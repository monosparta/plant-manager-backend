import { getOtherUserRentData, newRent } from '../services/rent';


const listOtherRents = async (req, res) => {
    res.status(200).json({
        message: 'Query Success',
        data: await getOtherUserRentData(req.user)
    });
};

const registerRent = async (req, res) => {
    await newRent(req.user);

    res.status(200).json({
        message: 'Registration successful'
    });
};

const updatePlantInfo = (req, res) => {

};

export { listOtherRents, registerRent, updatePlantInfo };