import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match!" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({ error: "Username already exists!" });
    }

    const salt = await bcrypt.genSalt(8); // Optimized salt rounds
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save(); // Save user first before generating the token
    generateTokenAndSetCookie(newUser._id, res);

    res.status(200).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Error in signup controller", error.message, error.stack);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Incorrect username or password!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect username or password!" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller", error.message, error.stack);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error.message, error.stack);
    res.status(500).json({ error: "Internal server error!" });
  }
};
