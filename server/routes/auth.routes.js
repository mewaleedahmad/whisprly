import express from "express";
import { signup,login,logout, resetPassword, sendEmail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post('/logout',logout)
router.post('/reset-password/:token',resetPassword)
router.post('/send-email',sendEmail)

export default router;