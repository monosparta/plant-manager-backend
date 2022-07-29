import jwt from 'jsonwebtoken';
import db from '../db/models';

const verifyToken = (req, res, next) => {
    if (
        req.headers &&
        req.headers.auth &&
        req.headers['auth-method'] === 'JWT'
    ) {
        jwt.verify(
            req.headers.auth,
            process.env.API_SECRECT,
            async (err, decode) => {
                if (err) {
                    req.user = undefined;
                    next();
                    return;
                }
                const user = await db.User.findOne({ where: { ID: decode.id } });
                req.user = user;
                next();
            }
        );
    } else {
        req.user = undefined;
        next();
    }
};
export default verifyToken;
