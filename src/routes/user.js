import express from 'express';
const router = express.Router();
import { verifyToken } from '../middlewares/authJWT';
import { getUser } from '../controllers/user';

router.get('/', verifyToken, getUser);

/* POST request Login*/
router.post('/login', login);
export default router;
