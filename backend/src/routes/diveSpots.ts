import express from "express";
import { getRecommendation } from "../controllers/diveSpotController";

const router = express.Router();

router.get("/recommendation", getRecommendation);

export default router;
