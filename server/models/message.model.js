import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
    },
    image : {
        type : String
    },
    seen:{
        type:Boolean,
        default:false
    },
   
},{timestamps:true})

const messageModel = mongoose.model('Message',messageSchema)

export default messageModel