import express from 'express'
import { createRating, searchStores, updateRating } from '../controller/rating.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

router.post('/',verifyToken,checkRole('USER'),createRating);
router.put('/:ratingId',verifyToken,checkRole('USER'),updateRating);
router.get('/store/search',verifyToken,checkRole('USER'),searchStores);

export default router;
