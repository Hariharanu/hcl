import express from "express";
import {
  createGoal,
  updateGoal,
  getGoalByUser
} from "../controller/goalsController.js";
import { authenticate } from "../middleware/jwt.js";

const router = express.Router();

router.post("/create/:userid", authenticate, createGoal);
router.put("/update/:userId", authenticate, updateGoal);
router.get("/:userId",authenticate, getGoalByUser);

export default router;
