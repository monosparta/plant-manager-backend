import express from 'express';
const router = express.Router();
import { verifyToken } from '../middlewares/authJWT';
import { getUser } from '../controllers/user';
import { updatePassword, login, register, requestChangePassword } from '../controllers/auth';

router.get('/', verifyToken, getUser);

/* POST request Login*/
router.post('/login', login);

/* POST request register*/
router.post('/register', register);

router.post('/password', requestChangePassword);

router.put('/password', verifyToken, updatePassword);

export default router;
