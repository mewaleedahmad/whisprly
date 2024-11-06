import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId,res)=>{
const token = jwt.sign({id:userId},process.env.TOKEN_SECRET,{
    expiresIn: "15d"
})
res.cookie("token",token,{
    expiresIn: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
})
}

export default generateTokenAndSetCookie;