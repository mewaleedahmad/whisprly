import express from 'express';
import { updateProfilePic,updatePassword,updateAccountInfo } from '../controllers/profile.controller.js';
import protectRoute from '../middlewares/protectRoute.js';
import upload from '../middlewares/multer.ProfileConfig.js';

const router = express.Router();

router.post("/",protectRoute,updateProfilePic )
router.post("/update-password",protectRoute,updatePassword )
router.post("/update-account-info",protectRoute,updateAccountInfo)
router.post("/update-profile-pic",protectRoute,upload.single('profilePic'),updateProfilePic)

export default router