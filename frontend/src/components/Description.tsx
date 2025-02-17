import { Box, Typography } from "@mui/material";

const Description = () => (
  <Box sx={{ textAlign: "center", mb: 2, maxWidth: "500px", mx: "auto" }}>
    <Typography variant="body1" sx={{ color: "#6b7280", fontSize: "16px", lineHeight: 1.6 }}>
      Select a date you would like to dive on to get the best dive recommendations based on real-time 
      weather and ocean conditions. The system analyses swell, wind, and tides in relation to the location
      features (what direction it faces, where it's protected from) to help you choose the perfect dive spot.
    </Typography>
  </Box>
);

export default Description;