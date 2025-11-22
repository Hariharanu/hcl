import express from "express";
import {
  createGoal,
  updateGoal,
  getGoalByUser
} from "../controller/goalsController.js";

const router = express.Router();

router.post("/create/:userid", createGoal);
router.put("/update/:userId", updateGoal);
router.get("/:userId", getGoalByUser);

export default router;
