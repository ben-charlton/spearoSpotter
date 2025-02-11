import { JSX, useEffect, useState } from "react";
import { Box, Container, Divider, Typography, Select, MenuItem, FormControl, createTheme, ThemeProvider } from "@mui/material";

//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = "https://spearospotter.online";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
    h6: {
      fontWeight: 400,
      fontSize: "1.5rem",
      color: "#C0392B",
    },
  },
});

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
          console.log(`Day selected is ${selectedDate}`);
          selectedDate.setUTCHours(12, 0, 0, 0); 
          const recoResponse = await fetch(`${API_BASE_URL}/api/dive-spots/recommendation?location=sydney&day=${selectedDate.toISOString()}`);
          const data = await recoResponse.json();
          console.log("Recommendation data is", data);
          
          const weatherResponse = await fetch(`${API_BASE_URL}/api/weather/conditions?location=sydney&day=${selectedDate.toISOString()}`);
          const weatherData = await weatherResponse.json();
          console.log("Weather data is", weatherData);
    
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
        <ThemeProvider theme={theme}>
    {/* Full-viewport background */}
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f5f5f5", // Full background now
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: { xs: 2, md: 10 }, // Responsive padding
        py: { xs: 3, md: 5 },
      }}
    >
      {/* Centered content box */}
      <Container
        maxWidth="sm"
        sx={{
          width: "100%",
          fontFamily: "Inter, sans-serif",
          color: "#2d2d2d",
        }}
      >
        {/* Title & Date Selection */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.5px",
              color: "#2d2d2d",
              fontSize: { xs: "24px", md: "32px" },
            }}
          >
            Choose Your Dive Date
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              displayEmpty
              sx={{
                background: "#ffffff",
                borderRadius: "8px",
                color: "#2d2d2d",
                fontSize: { xs: "14px", md: "16px" },
              }}
            >
              {dateOptions.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Map Section */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          {recommendation ? (
            <iframe
              src={`https://www.google.com/maps?q=${recommendation.latitude},${recommendation.longitude}&z=15&output=embed`}
              title="Dive Spot Map"
              width="100%"
              height="300"
              style={{
                borderRadius: "12px",
                border: "none",
                maxWidth: "600px",
              }}
            ></iframe>
          ) : (
            <Typography color="#C0392B">No map data available.</Typography>
          )}
        </Box>

        {/* Dive Site Information */}
        <Box
          sx={{
            background: "#ffffff", // White box for content
            padding: { xs: "16px", md: "24px" },
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)", // Soft shadow for depth
          }}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            gutterBottom
            color="#2d2d2d"
            sx={{ fontSize: { xs: "22px", md: "28px" } }}
          >
            Dive Site Information
          </Typography>
          <Divider sx={{ my: 2, background: "#C0392B" }} />
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mb: 1, fontSize: { xs: "18px", md: "24px" } }}
            color="#C0392B"
          >
            {recommendation?.name}
          </Typography>
          <Typography
            variant="body1"
            color="#6b7280"
            sx={{ mb: 3, fontSize: { xs: "14px", md: "16px" } }}
          >
            {recommendation?.description}
          </Typography>

          {/* Grid for Weather Data */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 3,
            }}
          >
            {[
              { label: "Wave Height", value: `${weather?.wave_height} m` },
              { label: "Swell Direction", value: `${weather?.swell_direction}°` },
              { label: "Swell Period", value: `${weather?.swell_period} sec` },
              { label: "Wind Speed", value: `${weather?.wind_speed} km/hr` },
              { label: "Wind Direction", value: `${weather?.wind_direction}°` },
              { label: "Water Temp", value: `${weather?.water_temperature}°C` },
              { label: "Cloud Cover", value: `${weather?.cloud_cover}%` },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  padding: 2,
                  background: "#f9fafb",
                  borderRadius: 3,
                  transition: "all 0.3s",
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight={700}
                  gutterBottom
                  color="#2d2d2d"
                  sx={{ fontSize: { xs: "14px", md: "16px" } }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="body1"
                  color="#6b7280"
                  sx={{ fontSize: { xs: "14px", md: "16px" } }}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  </ThemeProvider>
      );
};


export default DiveSpotDetails;