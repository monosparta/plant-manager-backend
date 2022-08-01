import jwt from 'jsonwebtoken';
import db from '../db/models';

const verifyToken = (req, res, next) => {
    if (
        req.headers &&
        req.headers.auth &&
        req.headers['auth-method'] === 'JWT'
    ) {
        // verify token with secrect
        jwt.verify(
            req.headers.auth,
            process.env.API_SECRECT,
            async (err, decode) => {
                // token invalid
                if (err) {
                    req.user = undefined;
                    next();
                    return;
                }

                // return user
                const user = await db.User.findOne({ where: { ID: decode.id } });
                req.user = user;
                next();
            }
        );
    } else { 
        // header invalid
        req.user = undefined;
        next();
    }
};
export default verifyToken;
