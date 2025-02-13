import { JSX, useEffect, useState, useMemo } from "react";
import { Box, Container, Divider, Typography, Select, MenuItem, FormControl, createTheme, ThemeProvider, CircularProgress } from "@mui/material";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("FOUND API URL HERE:", API_BASE_URL);

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
  const dateOptions = useMemo(() => 
    Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return date.toISOString().split("T")[0];
    }), 
    [today]
  );

  const fetchRecommendation = async (date: string) => {
    setLoading(true);
    try {
      console.log(`Fetching data for ${date}`);
      const dateObj = new Date(date);
      dateObj.setUTCHours(12, 0, 0, 0);

      const [recoResponse, weatherResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/dive-spots/recommendation?location=sydney&day=${dateObj.toISOString()}`),
        fetch(`${API_BASE_URL}/api/weather/conditions?location=sydney&day=${dateObj.toISOString()}`)
      ]);

      const [recoData, weatherData] = await Promise.all([recoResponse.json(), weatherResponse.json()]);
      console.log("Recommendation:", recoData, "Weather:", weatherData);

      setRecommendation(recoData.data);
      setWeather(weatherData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) fetchRecommendation(selectedDate);
  }, [selectedDate]);

  // I'm wrapping the static UI stuff in useMemo (no unecessary re-renders)
  const staticUI = useMemo(() => (
    <>
      {/* Description */}
      <Box sx={{ textAlign: "center", mb: 2, maxWidth: "500px", mx: "auto" }}>
        <Typography variant="body1" sx={{ color: "#6b7280", fontSize: "16px", lineHeight: 1.6 }}>
          Select a date you would like to dive on to get the best dive recommendations based on real-time 
          weather and ocean conditions. The system analyses swell, wind, and tides in relation to the location
          features (what direction it faces, where it's protected from) to help you choose the perfect dive spot.
        </Typography>
      </Box>

      {/* Title & Date Selection */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <FormControl fullWidth>
          <Select
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            displayEmpty
            sx={{
              background: "#ffffff",
              borderRadius: "8px",
              color: "#2d2d2d",
              fontSize: "16px",
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
    </>
  ), [selectedDate, dateOptions]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center", px: 2, py: 5 }}>
        <Container maxWidth="sm" sx={{ width: "100%", fontFamily: "Inter, sans-serif", color: "#2d2d2d" }}>
          {staticUI} 

          {/* Map Section with Loading Placeholder */}
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              mb: 3, 
              position: "relative", 
              width: "100%", 
              maxWidth: "600px", 
              height: "300px", // Fixed height so the layout doesn't shift while map renders
              background: "#f0f0f0", 
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {loading ? (
              <CircularProgress 
                size={50} 
                sx={{ color: "#C0392B", position: "absolute" }} 
              />
            ) : recommendation ? (
              <iframe
                src={`https://www.google.com/maps?q=${recommendation.latitude},${recommendation.longitude}&z=15&output=embed`}
                title="Dive Spot Map"
                width="100%"
                height="100%"
                style={{
                  borderRadius: "12px",
                  border: "none",
                }}
              ></iframe>
            ) : (
              <Typography color="#C0392B">No map data available.</Typography>
            )}
          </Box>

          {/* Dive Site Information (Only Re-renders on Date Change) */}
          <Box sx={{ background: "#ffffff", padding: "24px", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)" }}>
            <Typography variant="h4" fontWeight={600} gutterBottom color="#2d2d2d">
              Dive Site Information
            </Typography>
            <Divider sx={{ my: 2, background: "#C0392B" }} />

            {loading ? (
              <Typography color="#C0392B">Loading dive spot details...</Typography>
            ) : recommendation ? (
              <>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }} color="#C0392B">
                  {recommendation.name}
                </Typography>
                <Typography variant="body1" color="#6b7280" sx={{ mb: 3 }}>
                  {recommendation.description}
                </Typography>

                {/* Weather Data Grid */}
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
                  {[
                    { label: "Wave Height", value: `${weather?.wave_height} m` },
                    { label: "Swell Direction", value: `${weather?.swell_direction}°` },
                    { label: "Swell Period", value: `${weather?.swell_period} sec` },
                    { label: "Wind Speed", value: `${weather?.wind_speed} km/hr` },
                    { label: "Wind Direction", value: `${weather?.wind_direction}°` },
                    { label: "Water Temp", value: `${weather?.water_temperature}°C` },
                    { label: "Cloud Cover", value: `${weather?.cloud_cover}%` },
                  ].map((item, index) => (
                    <Box key={index} sx={{ padding: 2, background: "#f9fafb", borderRadius: 3 }}>
                      <Typography variant="body1" fontWeight={700} color="#2d2d2d">
                        {item.label}
                      </Typography>
                      <Typography variant="body1" color="#6b7280">
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </>
            ) : (
              <Typography color="#C0392B">No data available.</Typography>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DiveSpotDetails;