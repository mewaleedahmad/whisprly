import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Database Connected!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); 
  }
};

export default dbConnect;