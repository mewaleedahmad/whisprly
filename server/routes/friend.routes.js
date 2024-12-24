import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {getFriends,addFriend,removeFriend,} from "../controllers/friend.controller.js";

const router = express.Router();

router.get("/", protectRoute, getFriends);
router.post("/add/:id", protectRoute, addFriend);
router.delete("/remove/:id", protectRoute, removeFriend);

export default router;
