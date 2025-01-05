import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";
import {io} from "../socket/socket.js"

export const getFriends = async (req, res) => {
  try {
    const authUser = req.user._id;

    if (!authUser) {
      return res.status(400).json({ error: "User is required" });
    }

    const user = await userModel.findById(authUser).populate({
      path: "friends",
      select: "_id  userName fullName profilePic",
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.friends.length === 0) {
      return res
        .status(200)
        .json({ message: "Currently you don't have any friends" });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in getFriends in friendController", error.message);
  }
};

export const addFriend = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Sender or Receiver not found" });
    }

    const sender = await userModel.findById(senderId);
    if (sender.friends.includes(receiverId)) {
      return res.status(400).json({ error: "You are already friends" });
    }

    const receiver = await userModel.findById(receiverId);
    if (receiver.friends.includes(senderId)) {
      return res.status(400).json({ error: "You are already friends" });
    }

    const newFriend = await userModel.findById(receiverId).select("_id userName fullName profilePic")

    await Promise.all([
      userModel.findByIdAndUpdate(
        receiverId,
        { $addToSet: { friends: senderId } },
        { $new: true }
      ),
      userModel.findByIdAndUpdate(
        senderId,
        { $addToSet: { friends: receiverId } },
        { $new: true }
      ),
      userModel.findByIdAndUpdate(receiverId, {
        $pull: { friendRequests: senderId },
        $new: true,
      }),
      userModel.findByIdAndUpdate(senderId, { 
        $pull: { friendRequests: receiverId },
        $new: true,
      }),
    ]);
    res.status(200).json(newFriend);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in addFriend in friendController", error.message);
  }
};

export const removeFriend = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Sender or Receiver not found" });
    }

    const sender = await userModel.findById(senderId);
    if (!sender.friends.includes(receiverId)) {
      return res.status(400).json({ error: "You are not friends" });
    }

    const receiver = await userModel.findById(receiverId);
    if (!receiver.friends.includes(senderId)) {
      return res.status(400).json({ error: "You are not friends" });
    }

    await Promise.all([
      userModel.findByIdAndUpdate(
        receiverId,
        { $pull: { friends: senderId } },
        { $new: true }
      ),
      userModel.findByIdAndUpdate(
        senderId,
        { $pull: { friends: receiverId } },
        { $new: true }
      ),
      conversationModel.deleteOne({
        participants: { $all: [senderId, receiverId] },
      }),
      messageModel.deleteMany({
        senderId: senderId,
        receiverId: receiverId,
      })
    ]);

    res.status(200).json({ message: "Friend Removed" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in removeFriend in friendController", error.message);
  }
};
