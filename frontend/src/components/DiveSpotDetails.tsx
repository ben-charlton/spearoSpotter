import { JSX, useEffect, useState } from "react";

const DiveSpotDetails: () => JSX.Element = () => {

    const [recommendation, setRecommendation] = useState<any>(null);

    useEffect(() => {
        // Fetch recommended dive spot from the backend
        const fetchRecommendation = async () => {
            try {
                //const response = await fetch("/api/dive-spots/recommendation");
                //const data = await response.json();
                const data1 = {
                    name: "reco",
                    conditions: {
                        waveHeight: 3,
                        waterTemperature: 17,
                        windSpeed: 4,
                    },
                    description: "A great dive spot with excellent conditions today!",
                    location: {
                        latitude: -33.8688, 
                        longitude: 151.2093,
                    }
                }
                setRecommendation(data1);
            } catch (error) {
                console.error("Error fetching recommendation:", error);
            }
        };

        fetchRecommendation();
    }, []);

    if (!recommendation) {
        return <p>Loading recommended dive spot...</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Today's Recommended Dive Site</h2>
                <div className="w-full h-64 mb-4">
                    {recommendation.location ? (
                        <iframe
                            src={`https://www.google.com/maps?q=${recommendation.location.latitude},${recommendation.location.longitude}&z=15&output=embed`}
                            title="Dive Spot Map"
                            className="w-full h-full rounded-md"
                        ></iframe>
                    ) : (
                        <p>Map data not available.</p>
                    )}
                </div>
                <table className="w-full text-sm">
                    <tbody>
                        <tr>
                            <td className="font-semibold">Name:</td>
                            <td>{recommendation.name}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Wave Height:</td>
                            <td>{recommendation.conditions.waveHeight} m</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Water Temp:</td>
                            <td>{recommendation.conditions.waterTemperature} °C</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">Wind Speed:</td>
                            <td>{recommendation.conditions.windSpeed} km/h</td>
                        </tr>
                    </tbody>
                </table>
                <p className="mt-4 text-gray-600">{recommendation.description}</p>
            </div>
        </div>
    );
};


export default DiveSpotDetails;