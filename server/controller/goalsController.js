import goalModal from "../models/goalModal.js";

export const createGoal = async (req, res) => {
  try {
    const { userId, stepsToWalk, hoursToSleep, waterToIntake, updatedBy } =
      req.body;
    const existingGoal = await goalModal.findOne({ userId });
    if (existingGoal) {
      return res
        .status(400)
        .json({ message: "Goal already exists for this user" });
    }

    const goal = await goalModal.create({
      userId,
      stepsToWalk,
      hoursToSleep,
      waterToIntake,
      updatedBy,
    });

    res.status(201).json({ message: "Goal created", goal });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const updatedGoal = await goalModal.findOneAndUpdate({ userId }, updates, {
      new: true,
    });

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found for this user" });
    }

    res.json({ message: "Goal updated", goal: updatedGoal });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getGoalByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const goal = await goalModal.findOne({ userId });

    if (!goal) {
      return res.status(404).json({ message: "No goal found for this user" });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
