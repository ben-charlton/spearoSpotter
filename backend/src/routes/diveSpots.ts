import express from "express";
import { recommendDiveSpot } from "../controllers/diveSpotController";

const router = express.Router();

router.get("/recommendation", async (req, res, next) => {
    try {
      await recommendDiveSpot(req, res);
    } catch (error) {
      next(error); 
    }
});

export default router;
