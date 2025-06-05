import express from 'express'
import { adminStoreCreate, adminStoresList, deleteStore } from '../controller/adminStore.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router()

router.post('/store/create',verifyToken,checkRole('ADMIN'),adminStoreCreate);
router.get('/store/list',verifyToken,checkRole('ADMIN'),adminStoresList);
router.delete('/store/delete',verifyToken,checkRole('ADMIN'),deleteStore);

export default router;