import messageModel from "../models/message.model.js";
import conversationModel from "../models/coversation.model.js";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    res.status(200).json({ newMessage });
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in message controller", error.message);
  }
};

export default sendMessage;
