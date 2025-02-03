import express from "express";
import cors from "cors";
import diveSpotRoutes from "./src/routes/diveSpots";
import weatherRoutes from "./src/routes/weather";

const app = express();

app.use(cors({
    origin: "*", // Ben restrict this later!
    methods: "GET,POST",
  }));
app.use(express.json());

app.use("/api/dive-spots", diveSpotRoutes);
app.use("/api/weather", weatherRoutes);

export default app;