import express from "express";
import { getConditions } from "../controllers/weatherController";

const router = express.Router();

router.get("/conditions", async (req, res, next) => {
    try {
      await getConditions(req, res);
    } catch (error) {
      next(error); 
    }
});

export default router;