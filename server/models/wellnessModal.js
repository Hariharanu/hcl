import mongoose from "mongoose";

const dailyEntrySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  stepsWalked: {
    type: Number,
    default: 0
  },
  hoursOfSleep: {
    type: Number,
    default: 0
  },
  waterIntake: {
    type: Number,
    default: 0
  }
}, { _id: false });

const wellnessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true 
  },

  wellnessData: {
    type: [dailyEntrySchema],
    default: []
  }

}, { timestamps: true });

export default mongoose.model("Wellness", wellnessSchema);
