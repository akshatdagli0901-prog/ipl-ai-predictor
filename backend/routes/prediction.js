import express from "express";
import { predictWinner } from "../controllers/predictionController.js";

const router = express.Router();

router.post("/", predictWinner);

export default router;