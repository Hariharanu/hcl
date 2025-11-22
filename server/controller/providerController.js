import userModal from "../models/userModal.js";

export const getAllPatient = async (req, res) => {
  const { id } = req.user;
  if (id !== "") {
    // return res.status(403).json({ message: "Access denied" });
  }

  try {
    const provider = await userModal.findById(id).select("-password");
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    const patientIds = Array.isArray(provider.patientList)
      ? provider.patientList
      : [];

    if (patientIds.length === 0) {
      return res.status(200).json({ patients: [] });
    }

    const patients = await userModal
      .find({ _id: { $in: patientIds } })
      .select("-password");

    return res.status(200).json({ patients });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
