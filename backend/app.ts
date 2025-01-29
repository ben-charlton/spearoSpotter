import express from "express";
import cors from "cors";
import diveSpotRoutes from "./routes/diveSpots";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dive-spots", diveSpotRoutes);

export default app;