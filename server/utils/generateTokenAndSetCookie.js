import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.TOKEN_SECRET,{
    expiresIn: "15d"
  });

  return {token}
};

export default generateTokenAndSetCookie;
