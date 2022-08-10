import { getUserFromID } from '../services/user';

const checkAdmin = async (req, res, next) => {
    const user = await getUserFromID(req.user);
    if (!user.Role !== 1) {
        return res.status(403).json({
            message: 'Permission denied!'
        });
    }

    next();
};

export { checkAdmin };
