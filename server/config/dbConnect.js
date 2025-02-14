import mongoose from 'mongoose';

const dbConnect = async () => {
  const mongoURI = "mongodb+srv://"+ process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST +".mongodb.net/app"
  try {
    await mongoose.connect(mongoURI);
    console.log("Database Connected!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); 
  }
};

export default dbConnect;