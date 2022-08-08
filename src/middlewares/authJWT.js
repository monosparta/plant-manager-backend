import jwt from 'jsonwebtoken';
import { getUserFromID } from '../services/user';

const verifyToken = (req, res, next) => {
    if (
        !req.headers ||
        !req.headers.auth ||
        req.headers['auth-method'] !== 'JWT'
    ) {
        // header invalid
        return res.status(400).json({
            message: 'Invalid header'
        });
    }

    // verify token with secrect
    jwt.verify(
        req.headers.auth,
        process.env.JWT_SECRECT,
        async (err, decode) => {
            // token invalid
            if (err || !(await getUserFromID(decode.id))) {
                return res.status(401).json({
                    message: 'Invalid JWT token'
                });
            }

            // return user
            req.user = decode.id;
            next();
        }
    );
};

export { verifyToken };
