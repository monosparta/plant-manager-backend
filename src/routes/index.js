import express from 'express';
const router = express.Router();

/* GET home page. */
/* istanbul ignore next */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

export default router;
