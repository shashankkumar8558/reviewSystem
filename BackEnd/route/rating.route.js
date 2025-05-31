import express from 'express'
import { createRating, updateRating } from '../controller/rating.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/',verifyToken,createRating);
router.put('/:ratingId',verifyToken,updateRating);

export default router;
