import express from 'express';
import { createAdminAccount, deleteMember, deleteRent, getMembers, getRentAmount, getRentedList, getWaitList, markRentTaken, updateMemberRequest } from '../controllers/admin';
const router = express.Router();

import { verifyToken } from '../middlewares/authJWT';
import { checkAdmin } from '../middlewares/permission';

router.get('/rentedInfo', verifyToken, checkAdmin, getRentedList);

router.get('/waitList', verifyToken, checkAdmin, getWaitList);

router.get('/rentedAmount', verifyToken, checkAdmin, getRentAmount);

router.put('/rent/:id', verifyToken, checkAdmin, markRentTaken);

router.delete('/rent/:id', verifyToken, checkAdmin, deleteRent);

router.post('/addAdmin', verifyToken, checkAdmin, createAdminAccount);

router.get('/members', verifyToken, checkAdmin, getMembers);

router.put('/members', verifyToken, checkAdmin, updateMemberRequest);

router.delete('/member/:id', verifyToken, checkAdmin, deleteMember);

export default router;