import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.TOKEN_SECRET, {
    expiresIn: "100y", 
  });

  // Set a cookie with a 100-year expiry
  res.cookie("token", token, {
    maxAge: 100 * 365 * 24 * 60 * 60 * 1000, 
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export default generateTokenAndSetCookie;
