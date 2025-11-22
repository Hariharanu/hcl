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

export const assignProvider = async (req, res) => {
  const { providersId } = req.params;
  const { id: patientId } = req.user || {};

  if (!patientId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (patientId === providersId) {
    return res.status(400).json({ message: "Cannot assign yourself" });
  }

  try {
    const provider = await userModal.findById(providersId).select("-password");
    if (!provider || provider.role !== "PROVIDER") {
      return res.status(404).json({ message: "Provider not found" });
    }

    const patient = await userModal.findById(patientId).select("-password");
    if (!patient || patient.role !== "PATIENT") {
      return res.status(404).json({ message: "Patient not found" });
    }

    const updatedPatient = await userModal
      .findByIdAndUpdate(
        patientId,
        { $addToSet: { provider: providersId } },
        { new: true }
      )
      .select("-password");

    const updatedProvider = await userModal
      .findByIdAndUpdate(
        providersId,
        { $addToSet: { patientList: patientId } },
        { new: true }
      )
      .select("-password");

    return res.status(200).json({
      message: "Provider assigned",
      patient: updatedPatient,
      provider: updatedProvider,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updatePatientData = async (req, res) => {
  const { id } = req.user || {};
  const { weight, bp } = req.body;

  if (!id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const updatedPatient = await userModal
      .findByIdAndUpdate(id, { weight, bp }, { new: true })
      .select("-password");

    return res
      .status(200)
      .json({ message: "Patient data updated", patient: updatedPatient });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
