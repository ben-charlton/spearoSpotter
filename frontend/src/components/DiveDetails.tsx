import { Box, Typography, Divider } from "@mui/material";
import { Recommendation, Weather } from "../types/dive";

type DiveSpotProps = {
  recommendation: Recommendation | null;
  weather: Weather | null;
  loading: boolean;
};

const DiveDetails = ({ recommendation, weather, loading }: DiveSpotProps) => (

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

);

export default DiveDetails; 
          
          