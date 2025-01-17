import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"


export const updateProfile = async (req, res) => {

  const authUser = req.user._id;
  const { email, userName, fullName, profilePic, password, confirmPassword } = req.body;

  try {

    if (password === confirmPassword) {
      const user = await userModel.find(authUser);

      console.log(await bcrypt.compare(password, user?.password || ""))
    //  const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
    
      
    } else {
      res.status(200).json("Password don't match");
    }
  } catch (error) {
    res.status(404).json("Internal server error");
    console.log("Error in updateProfile in profileController", error.message);
  }
};
