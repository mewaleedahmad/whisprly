import express from 'express';
import dotenv  from 'dotenv';
import cookieParser from 'cookie-parser';
import dbConnect from './config/dbConnect.js';

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import getUsersRoutes from "./routes/getUsers.routes.js"
import friendRoutes from "./routes/friend.routes.js"

const app = express();
const PORT = process.env.PORT || 8000 
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/getusers",getUsersRoutes)
app.use("/api/friends",friendRoutes)

app.listen(PORT,()=>{
    dbConnect()
    console.log(`Server is running on ${PORT}`)
})