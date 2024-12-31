import express from 'express';
import {sendMessage,getMessages,getConversations, getLastMessage}  from '../controllers/message.controller.js';
import protectRoute from '../middlewares/protectRoute.js';
const router = express.Router();

router.post("/:id/",protectRoute, getMessages);
router.post("/send/:id",protectRoute, sendMessage)
router.get("/conversations",protectRoute, getConversations)
router.get("/get-last-message",protectRoute, getLastMessage)

export default router