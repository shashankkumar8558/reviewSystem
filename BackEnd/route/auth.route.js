import express from "express"
import { loginUser, signupUser } from "../controller/auth.controller.js";

const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser)

export default router;