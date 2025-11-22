export const getAllPatient = async (req, res) => {
  try {
    const patients = await userModal
      .find({ })
      .select("-password");
    res.status(200).json({ patients });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
