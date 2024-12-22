import userModel from '../models/user.model.js';
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';

export const signup = async(req,res)=>{
    try {
        const {email,userName,fullName,password,confirmPassword,gender} = req.body
        if (password !== confirmPassword) {
            res.status(400).json({error: 'Passwords do not match'})
        }
        const checkUserExists = await userModel.findOne({email})
        if (checkUserExists) {
           return res.status(400).json({message: 'A user with this email already exists.'})
        }
        const checkUniqueUsername = await userModel.findOne({userName})
        if(checkUniqueUsername) {
            return res.status(400).json({message: 'Username must be unique'})
        }
        
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await userModel.create({
            email,
            userName,
            fullName,
            password : hashedPassword,
            gender,
            profilePic: (gender === 'male')? boyProfilePic : girlProfilePic,
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()
            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName : newUser.userName,
                profilePic: newUser.profilePic,
                message: "Account Created Successfully"
            })
        }

    } catch (error) {
        res.status(500).json({error: "Internal server error"})
        console.log("Error occurred while Signup",error.message)
    }
}

export const login =async (req,res)=>{
    try {
        const {email, password} =  req.body
        const user = await userModel.findOne({email})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!isPasswordCorrect || !user){
          return res.status(400).json({message: "Invalid username or password"})
        }

        if(isPasswordCorrect ){
            generateTokenAndSetCookie(user._id,res)
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                userName : user.userName,
                profilePic: user.profilePic,
                message: "Login successful",
            })
        }

    } catch (error) {
        res.status(500).json({error: "Internal server error"})
        console.log("Error occurred while login",error.message)
    }
}

export const logout =(req,res)=>{
    try {
        res.cookie("token","",{maxAge:0}) 
        res.status(200).json({message: "Logout successfully"})
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
        console.log("Error occurred while logout",error.message)
    }
 }
