import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true  
  },

  stepsToWalk: {
    type: Number,
    default: 0
  },

  hoursToSleep: {
    type: Number,
    default: 0
  },

  waterToIntake: {
    type: Number,
    default: 0
  },

  updatedBy: {
    type: String, 
    default: ""
  }

}, { timestamps: true });

export default mongoose.model("Goal", goalSchema);
