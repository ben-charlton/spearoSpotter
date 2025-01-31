import express from "express";
import { recommendDiveSpot } from "../controllers/diveSpotController";

const router = express.Router();

router.get("/recommendation", recommendDiveSpot);

export default router;
