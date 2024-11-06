import express from 'express';
import mongoose from 'mongoose';

export default async function dbConnect(req,res){
try {
  const connection = await mongoose.connect(process.env.MONGO_DB_URI)
  console.log("Database Connected!")
} catch (error) {
    console.log("Database connection failed",error.message);
    throw new Error(error.message)
}
}