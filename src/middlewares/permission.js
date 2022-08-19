import { getUserFromID } from '../services/user';

const roles = {
    user: 0,
    admin: 1
};

const checkAdmin = async (req, res, next) => {
    const user = await getUserFromID(req.user);
    if (user.Role !== roles.admin) {
        return res.status(403).json({
            message: 'Permission denied!'
        });
    }

    next();
};

export { checkAdmin, roles };
