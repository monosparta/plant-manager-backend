import express from 'express';
const router = express.Router();
import { verifyToken } from '../middlewares/authJWT';
import { getUser } from '../controllers/user';
import { login, register } from '../controllers/auth';

router.get('/', verifyToken, getUser);

/* POST request Login*/
router.post('/login', login);

/* POST request register*/
router.post('/register', register);

export default router;
