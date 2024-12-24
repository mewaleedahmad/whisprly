import userModel from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filterUsers = await userModel.find({ _id: { $ne: loggedInUser } }).select("-password");

    res.status(200).json(filterUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in getUsers in userController", error.message);
  }
};
