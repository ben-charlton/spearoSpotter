import { Box, CircularProgress, Typography } from "@mui/material";

type MapProps = {
  loading: boolean;
  recommendation: { latitude: number; longitude: number } | null;
};

const Map = ({ loading, recommendation }: MapProps) => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 3, position: "relative", width: "100%", maxWidth: "600px", height: "300px", background: "#f0f0f0", borderRadius: "12px", overflow: "hidden" }}>
    {loading ? (
      <CircularProgress size={50} sx={{ color: "#C0392B", position: "absolute" }} />
    ) : recommendation ? (
      <iframe
        src={`https://www.google.com/maps?q=${recommendation.latitude},${recommendation.longitude}&z=15&output=embed`}
        title="Dive Spot Map"
        width="100%"
        height="100%"
        style={{ borderRadius: "12px", border: "none" }}
      ></iframe>
    ) : (
      <Typography color="#C0392B">No map data available.</Typography>
    )}
  </Box>
);

export default Map;