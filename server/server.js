import express from 'express';
import dotenv  from 'dotenv';
import authRoutes from "./routes/auth.routes.js"
import dbConnect from './config/dbConnect.js';
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const PORT = process.env.PORT || 5000 
app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    dbConnect()
    console.log(`Server is running on ${PORT}`)
})