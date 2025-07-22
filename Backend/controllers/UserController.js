import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password != confirmPassword) {
      return res.status(400).json({ message: "Password not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const seed = `${username}-${Math.random().toString(36).substring(2, 10)}`;
    const avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&gender=${gender}`;

    const data = await User.create({
      fullName,
      username,
      password: hashpassword,
      confirmPassword,
      profilePhoto: avatar,
      gender,
    });

    return res.status(201).json({
      message: "Account created Successfully",
      success: true,
    });
  }  catch (error) {
  console.error("Register error:", error.message);
  return res.status(500).json({ message: "Internal Server Error" });


  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ mesaage: "Incorrect Username" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
        message: "Login Successfully",
        success: true,
      });
  } catch (error) {
    return res.json({ message: "Error" });
  }
};
export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Loggedout Successfully",
    });
  } catch (error) {
    return res.json({ message: "Error" });
  }
};

export const getOtherUser = async (req, res) => {
  try {
    const loggedIn = req.id;
    const otherUser = await User.find({ _id: { $ne: loggedIn } }).select(
      "-password"
    );
    return res.status(200).json(otherUser);
  } catch (error) {
    return res.json({ message: "Error" });
  }
};
