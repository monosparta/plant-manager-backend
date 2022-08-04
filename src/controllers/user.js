import { getUserFromID } from '../services/user';
import { getRentData } from '../services/rent';

/* GET users data */
const getUser = async (req, res) => {
    const user = await getUserFromID(req.user);

    res.status(200).json({
        message: 'Query Success',
        user: {
            id: user.ID,
            name: user.Name,
            email: user.Email,
            phoneNumber: user.Phone_Number,
            isDefaultPassword: user.Is_Default_Password,
            role: user.Role
        },
        rents: await getRentData(user.ID),
    });
};

export { getUser };
