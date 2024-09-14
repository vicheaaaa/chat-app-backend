import User from "../models/user.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filterUsers = await User.find({ _id: { $ne: loggedInUserId } });

    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("Error in userController", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
