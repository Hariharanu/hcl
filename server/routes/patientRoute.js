import express from "express";
import { getAllProvider } from "../controller/patientController.js";


const router = express.Router();

router.get("/getAllProvider", getAllProvider);

// router.post("/assign/:patientID", regster);

export default router;
