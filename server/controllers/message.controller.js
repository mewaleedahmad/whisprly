import messageModel from "../models/message.model.js";
import conversationModel from "../models/conversation.model.js";
import { io, userSocketMap } from "../socket/socket.js"
import {v2 as cloudinary} from "cloudinary"
import { v4 as uuidv4 } from 'uuid';

export const sendMessage = async (req, res) =>  {
  try {
    const { message,image } = req.body;
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
    
    let cloudinaryResponse = " ";

   if(image){
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
       folder: `Whisprly/chat-images/${receiverId}`,
       transformation:{
        quality : "auto"
       }
      });
    }
      
    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message : message.message,
      image : cloudinaryResponse?.secure_url
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const receiverSocketId = userSocketMap[receiverId.toString()]
    const senderSocketId = userSocketMap[senderId.toString()]

    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",{newMessage})
    }
    if(senderSocketId){
      io.to(senderSocketId).emit("newMessage",{newMessage})
    }
    res.status(200).json({ newMessage });
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in sendMessage in messageController", error.message);
  }
};

export const getMessages = async(req,res)=>{
  try {
    const receiverId = req.params.id
    const senderId = req.user._id;

    const conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if(!conversation){
      return res.status(200).json([])
    }
    const messages = conversation.messages
    res.status(200).json(messages)
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in getMessages in messageController", error.message);
  }

}

export const getConversations = async (req, res) => {
  try {
    const authUser = req.user._id;

    const conversations = await conversationModel.find(
      { participants: { $in: [authUser] } },
      { participants: 1 } // Project only the participants field
    ).populate({
      path: 'participants',
      match: { _id: { $ne: authUser } }, 
      select: '-email -password -gender -friends -friendRequests -createdAt -updatedAt', 
    }).sort({ updatedAt: -1 });

    if(!conversations || conversations.length === 0) {
      return res.status(200).json({ message: 'No conversations found' });
    }
    const participantData = conversations.flatMap(convo => convo.participants);
    res.status(200).json(participantData);

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error('Error in getConversations in messageController:', error.message);
  }
};

export const getLastMessage = async (req,res) =>{
  try {
     const authUser = req.user._id

     const findMessage = await conversationModel.find({
      participants : {$in : [authUser]},
     })
     .select({messages : {$slice :-1}})
     .populate({
      path : "messages"
     })

     const lastMessage = findMessage.flatMap((lastMsg)=>lastMsg.messages)

     const senderSocketId = userSocketMap[authUser.toString()]

     if(senderSocketId){
      io.to(senderSocketId).emit("getLastMessage",lastMessage)
     }
     res.status(200).json(lastMessage)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error('Error in getLastMessage in messageController:', error.message);
  }
}

export const markMessageSeen = async(req,res)=>{
  try {
    const senderId = req.user._id;   
    const receiverId = req.params.id

    const updatedMessages = await messageModel.updateMany(
      {
      senderId : receiverId,
      receiverId: senderId,
      seen:false
    },
    {
      $set : {
        seen: true
      }
    }
  )

  const senderSocketId = userSocketMap[senderId.toString()]
  const receiverSocketId = userSocketMap[receiverId.toString()]

  if(senderSocketId){
    io.to(senderSocketId).emit("messagesSeen",receiverId);
  }
  if(receiverSocketId){
    io.to(receiverSocketId).emit("messagesSeen",senderId);
  }
  
  res.status(200).json({success:true})
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error('Error in markMessageSeen in messageController:', error.message);
  }
}

