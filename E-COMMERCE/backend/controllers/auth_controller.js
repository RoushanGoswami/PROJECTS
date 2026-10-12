import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password means encrypt the password

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of rounds for hashing

    // create a new user
    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User Registered Successfully !" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// User signin
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // check if the user is already registered or not agar hai toh sigin
    //  karwa do agar nhi hai to keh do ki user not found !
    if (!user) {
      return res.status(400).json({ message: "User not found !" });
    }
    //compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid Credentials !" });
    }

    // JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // uper jwt generate ho gaya hai then signin ka message show kr do
    res.json({
      message: "Signin Successfully !",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
