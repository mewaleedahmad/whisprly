import userModel from "../models/user.model.js";

export const getFriends = async (req, res) => {
  try {
    const senderId = req.user._id;

    if (!senderId) {
      return res.status(400).json({ error: "Sender ID is required" });
    }

    const user = await userModel.findById(senderId).populate({
      path: "friends",
      select: "-password -friends -__v -createdAt -updatedAt",
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.friends.length === 0) {
      return res
        .status(200)
        .json({ message: "Currently you don't have any friends" });
    }

    res.status(200).json({ friends: user.friends });
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
    ]);
    res.status(200).json({ message: "Friend Added" });
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
    ]);

    res.status(200).json({ message: "Friend Removed" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in removeFriend in friendController", error.message);
  }
};
