import wellnessModal from "../models/wellnessModal.js";
import { normalize } from "../util.js";

export const addToWellnessTrack = async (req, res) => {
  const { id } = req.user || {};
  const { date, steps, sleepHours, waterIntake } = req.body;

  if (!id) {
    return res.status(401).json({ message: "Unauthorized" });
  }



  const today = normalize(new Date());
  const target = normalize(date);

  if (target < today) {
    return res
      .status(400)
      .json({
        message: "Cannot add or modify wellness entries for past dates",
      });
  }
  try {
    let wellnessRecord = await wellnessModal.findOne({ userId: id });

    if (!wellnessRecord) {
      wellnessRecord = new wellnessModal({ userId: id, wellnessData: [] });
    }
    const existingEntryIndex = wellnessRecord.wellnessData.findIndex(
      (entry) => entry.date === date
    );

    if (existingEntryIndex !== -1) {
      wellnessRecord.wellnessData[existingEntryIndex].stepsWalked = steps;
      wellnessRecord.wellnessData[existingEntryIndex].hoursOfSleep = sleepHours;
      wellnessRecord.wellnessData[existingEntryIndex].waterIntake = waterIntake;
    } else {
      wellnessRecord.wellnessData.push({
        date,
        stepsWalked: steps,
        hoursOfSleep: sleepHours,
        waterIntake: waterIntake,
      });
    }

    await wellnessRecord.save();

    return res
      .status(200)
      .json({ message: "Wellness data updated", wellnessRecord });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getWellnessTrack = async (req, res) => {
  const { id } = req.user || {};

  if (!id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const wellnessRecord = await wellnessModal.findOne({ userId: id });

    if (!wellnessRecord) {
      return res
        .status(404)
        .json({ message: "No wellness data found for this user" });
    }

    return res.status(200).json({ wellnessRecord });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
