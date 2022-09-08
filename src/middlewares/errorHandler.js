import { logger } from '../services/logger';

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
    logger.error(err);
    res.status(500).json({
        message: 'Internal server error'
    });
};

export { handleError };
