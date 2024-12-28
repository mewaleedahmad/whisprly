import messageModel from "../models/message.model.js";
import conversationModel from "../models/conversation.model.js";

export const sendMessage = async (req, res) =>  {
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
    console.log("Error in sendMessage in messageController", error.message);
  }
};

// export const getMessages = async(req,res)=>{
//   try {
//     const receiverId = req.params.id
//     const senderId = req.user._id;

//     const conversation = await conversationModel.findOne({
//       participants: { $all: [senderId, receiverId] },
//     }).populate("messages");

//     if(!conversation){
//       return res.status(404).json([])
//     }
//     const messages = conversation.messages
//     res.status(200).json(messages)
    
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//     console.log("Error in getMessages in messageController", error.message);
//   }

// }

export const getConversations = async (req, res) => {
  try {
    const authUser = req.user._id;

    const conversations = await conversationModel.find(
      { participants: { $in: [authUser] } }, // Match conversations with the authUser in participants
      { participants: 1 } // Project only the participants field
    ).populate({
      path: 'participants',
      match: { _id: { $ne: authUser } }, // Exclude the authenticated user
      select: '-email -password -gender -friends -friendRequests -createdAt -updatedAt', 
    });

    if(!conversations || conversations.length === 0) {
      return res.status(404).json({ message: 'No conversations found' });
    }

    // Extract only the populated participants array
    const participantData = conversations.map(convo => convo.participants);

    res.status(200).json(participantData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error('Error in getConversations in messageController:', error.message);
  }
};
