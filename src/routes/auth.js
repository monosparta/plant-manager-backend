import express from 'express';
const router = express.Router();

import { login } from '../controllers/auth';

/* POST request Login*/
router.post('/', login);

export default router;
