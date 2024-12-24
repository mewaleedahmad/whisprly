import express from 'express';
import { updateProfile } from '../controllers/profile.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.post("/",protectRoute,updateProfile)

export default router