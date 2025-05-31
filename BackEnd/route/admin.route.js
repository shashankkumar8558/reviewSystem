import express from "express";
import { adminDashboard, ratedList, roleUpdate } from "../controller/admin.controller.js";
import { checkRole } from "../middleware/checkRole.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.put('/role/update',verifyToken,checkRole('ADMIN'),roleUpdate) //Role Update
router.get('/rated',verifyToken,checkRole('ADMIN'),ratedList);
router.get('/dashboard',verifyToken,checkRole('ADMIN'),adminDashboard);

export default router