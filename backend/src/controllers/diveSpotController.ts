import { Request, Response } from "express";

export const getRecommendation = async (req: Request, res: Response) => {
    try {
        const recommendation = {
            name: "Bondi Beach",
            conditions: {
                waveHeight: 1.5,
                waterTemperature: 22,
                windSpeed: 10,
            },
            description: "A fantastic dive spot with calm waters and great visibility today!",
            location: {
                latitude: -33.8915,
                longitude: 151.2767,
            },
        };

        res.json(recommendation);
    } catch (error) {
        console.error("Error generating recommendation:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};