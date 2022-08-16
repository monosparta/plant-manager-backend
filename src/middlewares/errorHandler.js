// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal server error'
    });
};

export { handleError };
