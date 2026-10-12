import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check the data first
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "Name is required !" });
    }

    if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({ message: "Please enter a valid email !" });
    }

    if (typeof password !== "string" || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters !" });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    const userExists = await User.findOne({ email: cleanEmail });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password means encrypt the password

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of rounds for hashing

    await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User Registered Successfully !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User signin
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ message: "Email and password are required !" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password !" });
    }
    //compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password !" });
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
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
