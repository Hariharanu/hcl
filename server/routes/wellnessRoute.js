import express from "express";
import { authenticate } from "../middleware/jwt.js";
import { addToWellnessTrack, getWellnessTrack } from "../controller/WellnessController.js";


const router = express.Router();

router.put("/addToWellnessTrack", authenticate, addToWellnessTrack);
router.get("/getWellnessTrack", authenticate, getWellnessTrack);


export default router;
