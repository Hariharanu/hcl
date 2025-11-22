import express from "express";
import { assignProvider, getAllProvider } from "../controller/patientController.js";
import { authenticate } from "../middleware/jwt.js";
import { getAllPatient } from "../controller/providerController.js";


const router = express.Router();

router.get("/getAllPatient", authenticate,  getAllPatient);



export default router;
