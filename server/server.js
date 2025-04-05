import express from 'express';
import dotenv  from 'dotenv';
import cors from "cors"
import cookieParser from 'cookie-parser';
import dbConnect from './config/dbConnect.js';
import { v2 as cloudinary } from 'cloudinary';

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import getUsersRoutes from "./routes/getUsers.routes.js"
import friendRoutes from "./routes/friend.routes.js"
import profileRoutes from "./routes/profile.routes.js"
import {app,server} from './socket/socket.js';
import { CLIENT_URL } from './config/config.js';
import keepAppRunning from './utils/KeepAppRunning.js';
const PORT = process.env.PORT || 8000 
dotenv.config();

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_NAME , 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret:process.env.CLOUDINARY_API_SECRET 
  });

app.use(cors({
  origin : CLIENT_URL,
}))

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit:"10mb",extended:true}));
app.use(cookieParser())

keepAppRunning()

app.get("/",(req,res)=>{
  res.status(200).json({status: "OK"})
})
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/getusers",getUsersRoutes)
app.use("/api/friends",friendRoutes)
app.use("/api/profile",profileRoutes)

server.listen(PORT,()=>{
    dbConnect()
    console.log(`Server is running`)
})