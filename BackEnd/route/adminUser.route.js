import express from 'express';
import { adminUserCreate, adminUsersList } from '../controller/adminUser.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

router.post('/users/create',verifyToken,checkRole('ADMIN'),adminUserCreate);
router.get('/users/list',verifyToken,checkRole('ADMIN'),adminUsersList)

export default router;