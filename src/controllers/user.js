import { getUserFromID } from '../services/user';
import { getUserRentData } from '../services/rent';

/* GET users data */
const getUser = async (req, res) => {
    const user = await getUserFromID(req.userId);

    res.status(200).json({
        message: 'Query Success',
        user: {
            id: user.ID,
            name: user.Name,
            email: user.Email,
            isDefaultPassword: user.Is_Default_Password,
            role: user.Role
        },
        rents: await getUserRentData(user.ID)
    });
};

export { getUser };
