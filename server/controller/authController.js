import userModal from "../models/userModal.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, role, bp, weight, exprience, specialization } =
    req.body;
  try {
    const user = new userModal({
      name,
      email,
      password,
      role,
      exprience: role === "PROVIDER" ? exprience : undefined,
      specialization: role === "PROVIDER" ? specialization : undefined,
      bp: role === "PATIENT" ? bp : undefined,
      weight: role === "PATIENT" ? weight : undefined,
    });
    const userData = await user.save();
    const userObj = userData.toObject();
    delete userObj.password;
    res
      .status(201)
      .json({ message: "User registered successfully", user: userObj });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userObj = user.toObject();
    delete userObj.password;

    res
      .status(200)
      .json({
        message: "Login successful",
        token,
        name: user.name,
        email: user.email,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
