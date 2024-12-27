import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {getFriends,addFriend,removeFriend,} from "../controllers/friend.controller.js";
import { getReq, rejectReq, sendReq } from "../controllers/requests.controller.js";

const router = express.Router();

// for friends
router.get("/", protectRoute, getFriends);
router.post("/add/:id", protectRoute, addFriend);
router.delete("/remove/:id", protectRoute, removeFriend);

// for friendRequests
router.get("/request", protectRoute, getReq);
router.post("/request/send/:id", protectRoute, sendReq);
router.delete("/request/reject/:id", protectRoute, rejectReq);

export default router;
