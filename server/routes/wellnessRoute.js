import express from "express";
import { authenticate } from "../middleware/jwt.js";
import { addToWellnessTrack } from "../controller/WellnessController.js";


const router = express.Router();

router.put("/addToWellnessTrack", authenticate, addToWellnessTrack);



export default router;
