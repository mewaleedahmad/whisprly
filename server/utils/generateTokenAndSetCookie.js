import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.TOKEN_SECRET);

  // res.cookie("token", token, {
  //   maxAge: 1 * 60 * 1000, 
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development",
  //   sameSite: "Strict",
  // });

  return {token}
};

export default generateTokenAndSetCookie;
