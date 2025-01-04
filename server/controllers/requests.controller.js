import userModel from "../models/user.model.js";

export const getReq = async (req, res) => {
    try {
      const authUser = req.user._id;
  
      const user = await userModel.findById(authUser).populate({
        path: "friendRequests",
        select: "_id email userName fullName profilePic",
      });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (user.friendRequests.length === 0) {
        return res.status(200).json({
          message: "Your friend request list is empty. Check back later!",
        });
      }
  
      res.status(200).json(user.friendRequests);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log("Error in getReq in friendController", error.message);
    }
  };
  
  export const sendReq = async (req, res) => {
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
  
      const checkDuplicateSender = await userModel.findById(receiverId);
      if (checkDuplicateSender.friendRequests.includes(senderId)) {
        return res.status(400).json({ error: "Request already sent" });
      }

      const checkDuplicateReceiver = await userModel.findById(senderId);
      if (checkDuplicateReceiver.friendRequests.includes(receiverId)) {
        return res.status(400).json({ error: "This user has already sent you a request" });
      }
      
  
      await userModel.findByIdAndUpdate(
        receiverId,
        { $addToSet: { friendRequests: senderId } },
        { $new: true }
      );
  
      res.status(200).json({ message: "Friend Request Sent" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log("Error in sendReq in friendController", error.message);
    }
  };
  
  export const rejectReq = async (req, res) => {
    try {
      const authUser = req.user._id;
      const rejectUser = req.params.id;
  
      if (!authUser || !rejectUser) {
        return res.status(400).json({ error: "Sender or Receiver not found" });
      }
  
      // const user = await userModel.findById(authUser);
      // if (!user.friendRequests.includes(rejectReq)) {
      //   return res.status(400).json({ error: "Request not found" });
      // }
      await userModel.findByIdAndUpdate(
        authUser,
        { $pull: { friendRequests: rejectUser } },
        { $new: true }
      );
  
      res.status(200).json({ message: "Friend Request Rejected" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log("Error in rejectReq in friendController", error.message);
    }
  };
  