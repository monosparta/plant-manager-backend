import express from 'express';
import { createAdminAccount, deleteAdmin, deleteRent, getAdmins, getRentAmount, getRentedList, getWaitList, markRentTaken, updateMemberRequest } from '../controllers/admin';
const router = express.Router();

import { verifyToken } from '../middlewares/authJWT';
import { checkAdmin } from '../middlewares/permission';

router.get('/rentedInfo', verifyToken, checkAdmin, getRentedList);

router.get('/waitList', verifyToken, checkAdmin, getWaitList);

router.get('/rentedAmount', verifyToken, checkAdmin, getRentAmount);

router.put('/rent/:id', verifyToken, checkAdmin, markRentTaken);

router.delete('/rent/:id', verifyToken, checkAdmin, deleteRent);

router.put('/member', verifyToken, checkAdmin, updateMemberRequest);

router.get('/admin', verifyToken, checkAdmin, getAdmins);

router.post('/admin', verifyToken, checkAdmin, createAdminAccount);

router.delete('/admin/:id', verifyToken, checkAdmin, deleteAdmin);

export default router;