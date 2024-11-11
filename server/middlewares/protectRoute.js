import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

 const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!decoded || !token) {
      return res
        .status(401)
        .json({ error: "You are not authorized! Please login" });
    }

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in protectRoute middleware", error.message);
  }
};

export default protectRoute;