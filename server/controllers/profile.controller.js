import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"


export const updateProfilePic = async (req, res) => {

  const authUser = req.user._id;
  const { email, userName, fullName, profilePic, password, confirmPassword } = req.body;

  try {

    if (password === confirmPassword) {
      const user = await userModel.find(authUser) ;

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