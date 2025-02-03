import { JSX, useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from '@mui/material';

const DiveSpotDetails: () => JSX.Element = () => {

    const [recommendation, setRecommendation] = useState<any>(null);
    const [weather, setWeather] = useState<any>(null);


    useEffect(() => {
    
        const fetchRecommendation = async () => {
            try {
                console.log('fetching');
                const recoResponse = await fetch("http://localhost:5000/api/dive-spots/recommendation?location=sydney");
                const data = await recoResponse.json();
                const weatherResponse = await fetch("http://localhost:5000/api/weather/conditions?location=sydney");
                const weatherData = await weatherResponse.json();
                setRecommendation(data.data);
                setWeather(weatherData.data);
                console.log(recommendation);
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5'
          }}
        >
          <Card sx={{ maxWidth: 400, margin: '20px', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" component="h2" align="center" gutterBottom>
                Today's Recommended Dive Site
              </Typography>
    
              <Box display="flex" justifyContent="center" marginBottom="16px">
                {recommendation.name ? (
                  <iframe
                    src={`https://www.google.com/maps?q=${recommendation.latitude},${recommendation.longitude}&z=15&output=embed`}
                    title="Dive Spot Map"
                    width="100%"
                    height="200"
                    style={{ borderRadius: '8px' }}
                  ></iframe>
                ) : (
                  <Typography>No map data available.</Typography>
                )}
              </Box>
    
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" fontWeight="bold">Name:</Typography>
                  <Typography variant="body1">{recommendation.name}</Typography>
                </Box>
    
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" fontWeight="bold">Wave Height:</Typography>
                  <Typography variant="body1">{weather.wave_height} m</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" fontWeight="bold">Swell Direction:</Typography>
                  <Typography variant="body1">{weather.swell_direction} °</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" fontWeight="bold">Swell Period:</Typography>
                  <Typography variant="body1">{weather.swell_period} seconds</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" fontWeight="bold">Wind Speed:</Typography>
                  <Typography variant="body1">{weather.wind_speed} km/hr</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" fontWeight="bold">Wind Direction:</Typography>
                  <Typography variant="body1">{weather.wind_direction} °</Typography>
                </Box>
    
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" fontWeight="bold">Water Temp:</Typography>
                  <Typography variant="body1">{weather.water_temperature} °C</Typography>
                </Box>
    
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" fontWeight="bold">Cloud Cover:</Typography>
                  <Typography variant="body1">{weather.cloud_cover} %</Typography>
                </Box>
              </Box>
    
              <Typography variant="body2" color="textSecondary" align="center" marginTop="16px">
                {recommendation.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      );
};


export default DiveSpotDetails;