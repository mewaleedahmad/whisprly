import express from 'express';
import {sendMessage, getConversations}  from '../controllers/message.controller.js';
import protectRoute from '../middlewares/protectRoute.js';
const router = express.Router();

// router.get("/:id/",protectRoute, getMessages);
router.post("/send/:id",protectRoute, sendMessage)
router.get("/conversations",protectRoute, getConversations)

export default router