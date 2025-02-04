import { JSX, useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Select, MenuItem, FormControl,InputLabel, } from "@mui/material";

const DiveSpotDetails: () => JSX.Element = () => {

    const [recommendation, setRecommendation] = useState<any>(null);
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

    const today = new Date();
    const dateOptions = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return date.toISOString().split("T")[0];
    });

    const fetchRecommendation = async (selectedDate : Date) => {
        setLoading(true);
        try {
          console.log(`day selected is ${selectedDate}`);
          selectedDate.setUTCHours(12, 0, 0, 0); 
          const recoResponse = await fetch(`http://localhost:5000/api/dive-spots/recommendation?location=sydney&day=${selectedDate.toISOString()}`);
          const data = await recoResponse.json();
          
          const weatherResponse = await fetch(`http://localhost:5000/api/weather/conditions?location=sydney&day=${selectedDate.toISOString()}`);
          const weatherData = await weatherResponse.json();
    
          setRecommendation(data.data);
          setWeather(weatherData.data);
        } catch (error) {
          console.error("Error fetching recommendation:", error);
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedDate) {
            const dateObj = new Date(selectedDate);
            fetchRecommendation(dateObj);
        }
    }, [selectedDate]);

    if (loading) {
        return <p>Loading recommended dive spot...</p>;
    }

    if (!recommendation || !weather) {
        return <p>No data available. Please select a date.</p>;
    }

    return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
            gap: 2, 
          }}
        >

        <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
                Select a Dive Date
            </Typography>

            <FormControl fullWidth>
                <InputLabel></InputLabel>
                <Select
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                displayEmpty
                >
                {dateOptions.map((date) => (
                    <MenuItem key={date} value={date}>
                    {date}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </CardContent>
          </Card>

          <Card sx={{ maxWidth: 400, margin: '20px', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" component="h2" align="center" gutterBottom>
                Recommended Dive Site for {selectedDate}
              </Typography>
    
              <Box display="flex" justifyContent="center" marginBottom="16px">

                {recommendation ? (
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