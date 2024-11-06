import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
   
},{timestamps:true})

const messageModel = mongoose.model('message',messageSchema)
export default messageModel