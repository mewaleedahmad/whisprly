import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

 const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers['authorization']

    if (!token) {
      return res.status(401).json({ error: "No token provided. Please login" });
    }
    const tokenValue = token.split(' ')[1]
    try {
      const decoded = jwt.verify(tokenValue, process.env.TOKEN_SECRET);
      const user = await userModel.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      req.user = user;
      next();
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in protectRoute middleware", error.message);
  }
};

export default protectRoute;