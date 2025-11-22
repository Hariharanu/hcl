import userModal from "../models/userModal.js";

export const getAllProvider = async (req, res) => {
  try {
    const providers = await userModal
      .find({ role: "PROVIDER" })
      .select("-password");
    res.status(200).json({ providers });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
