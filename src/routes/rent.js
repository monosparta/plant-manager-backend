import express from 'express';
import { listOtherRents, registerRent, updatePlantInfo } from '../controllers/rent';
const router = express.Router();

import { verifyToken } from '../middlewares/authJWT';
import { handleFileUpload } from '../middlewares/formParser';

router.get('/list/others', verifyToken, listOtherRents);
router.post('/register', verifyToken, registerRent);
router.post('/plantInfo', verifyToken, handleFileUpload, updatePlantInfo);

export default router;
