import express from 'express'
import { ownerStoreAverageRating, ownerStoreRatings } from '../controller/owner.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

router.get('/store/ratings',verifyToken,checkRole('OWNER'),ownerStoreRatings);
router.get('/store/average',verifyToken,checkRole('OWNER'),ownerStoreAverageRating);

export default router;