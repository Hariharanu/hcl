import express from "express";
import { assignProvider, getAllProvider } from "../controller/patientController.js";
import { authenticate } from "../middleware/jwt.js";


const router = express.Router();

router.get("/getAllProvider", getAllProvider);

router.post("/assign/:providersId", authenticate, assignProvider);

// router.post("/assign/:providerID", assignProvider);

export default router;
