import express from 'express';
import dotenv  from 'dotenv';
import cookieParser from 'cookie-parser';
import dbConnect from './config/dbConnect.js';

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"


const app = express();
const PORT = process.env.PORT || 5000 
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.use("/api/messages",messageRoutes)
app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    dbConnect()
    console.log(`Server is running on ${PORT}`)
})