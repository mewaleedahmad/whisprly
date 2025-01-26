import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const updateProfilePic = async (req, res) => {
  try {
    const authUser = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      await cloudinary.api.resource(`Whisprly/avatars/${req.user._id}`);
      // If image exists, delete it
      await cloudinary.uploader.destroy(`Whisprly/avatars/${req.user._id}`);
    } catch (error) {
      // If error.http_code is 404, image doesn't exist, which is fine
      if (error.http_code !== 404) {
        console.log("Error checking/deleting existing profile picture:", error.message);
      }
    }

    // Upload new image
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "Whisprly/avatars",
      public_id: req.user._id,
      transformation: {
        width: 500,
        height: 500,
        crop: "fill",
        gravity: "auto"
      }
    });

    await userModel.findByIdAndUpdate(authUser, {
      profilePic: cloudinaryResponse.secure_url
    }, { new: true });
    
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log("Error deleting temporary file:", err);
        }
      });
    }

    res.status(200).json({ 
      message: "Profile picture updated successfully",
      profilePic: cloudinaryResponse.secure_url
    });
   
  } catch (error) {
    console.log("Error in updateProfilePic in profileController:", error.message);
    res.status(500).json({ message: "Failed to update profile picture" });
  }
};

export const updatePassword = async (req,res)=>{
 try {
  const authUser = req.user._id;
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  const user = await userModel.findById(authUser);
  
  if(newPassword != confirmNewPassword){
    res.status(401).json("Passwords don't match");
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(oldPassword, user?.password || "")
  if(!isPasswordCorrect){
    res.status(401).json("Incorrect Password");
    return;
  }
  if(isPasswordCorrect){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await userModel.findByIdAndUpdate(authUser, { password: hashedPassword });
    res.status(200).json("Password Updated");
  }
 } catch (error) {
   res.status(500).json("Internal Server Error");
   console.log("Error in updatePassword in profileController", error.message);
  
 }
}

export const updateAccountInfo = async (req,res)=>{
  try {
    const authUser = req.user._id;
    const { newEmail, newUserName, newFullName } = req.body;
    
     if (!newEmail && !newUserName && !newFullName) {
      return res.status(400).json({ message: "No input provided to update" });
    }

    const updatedFields = {};
    
    const user = await userModel.findById(authUser)

    if(newEmail){
      const checkUniqueEmail = await userModel.findOne({email: newEmail})
      if(checkUniqueEmail) {
        res.status(400).json({message: "Email already exists"});
        return;
       }
    }
    if(newUserName){
      const checkUniqueUserName = await userModel.findOne({userName: newUserName})
      if(checkUniqueUserName ) {
        res.status(400).json({message: "Username must be unique"});
        return;
       }
    } 
     
    if (newEmail && newEmail !== user.email) {
      updatedFields.email = newEmail;
    }
    if (newUserName && newUserName !== user.userName) {
      updatedFields.userName = newUserName;
    }
    if (newFullName && newFullName !== user.fullName) {
      updatedFields.fullName = newFullName;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "No changes detected" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(authUser, updatedFields, { new: true });

    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      userName : updatedUser.userName,
      profilePic: updatedUser.profilePic,
      email : updatedUser.email,
      message: "Account Updated"
  })
         
  } catch (error) {
     res.status(500).json("Internal Server Error");
     console.log("Error in updateAccountInfo in profileController", error.message);
  }
}