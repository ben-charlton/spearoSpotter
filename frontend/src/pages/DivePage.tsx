import { useEffect, useState, useMemo } from "react";
import { Box, Container, ThemeProvider, createTheme } from "@mui/material";
import DateSelection from "../components/DateSelection";
import Description from "../components/Description";
import Map from "../components/Map";
import DiveDetails from "../components/DiveDetails";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const theme = createTheme({
  typography: { fontFamily: "Inter, sans-serif", h6: { fontWeight: 400, fontSize: "1.5rem", color: "#C0392B" } },
});

interface Recommendation {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface Weather {
  wave_height: number;
  swell_direction: number;
  swell_period: number;
  wind_speed: number;
  wind_direction: number;
  water_temperature: number;
  cloud_cover: number;
}

const getFormattedDate = (offset: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split("T")[0];
};

const fetchData = async (date: string): Promise<{ recommendation: Recommendation | null; weather: Weather | null }> => {
  try {
    const dateObj = new Date(date);
    dateObj.setUTCHours(12, 0, 0, 0);
    const [recoRes, weatherRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/dive-spots/recommendation?location=sydney&day=${dateObj.toISOString()}`),
      fetch(`${API_BASE_URL}/api/weather/conditions?location=sydney&day=${dateObj.toISOString()}`)
    ]);

    const recoData = await recoRes.json();
    const weatherData = await weatherRes.json();
    return { recommendation: recoData.data, weather: weatherData.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { recommendation: null, weather: null };
  }
};

const DivePage = () => {

  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(getFormattedDate());

  const dateOptions = useMemo(() => Array.from({ length: 7 }, (_, i) => getFormattedDate(i)), []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { recommendation, weather } = await fetchData(selectedDate);
      setRecommendation(recommendation);
      setWeather(weather);
      setLoading(false);
    };
    loadData();
  }, [selectedDate]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center", px: 2, py: 5 }}>
        <Container maxWidth="sm">
          <Description />
          <DateSelection selectedDate={selectedDate} setSelectedDate={setSelectedDate} dateOptions={dateOptions} />
          <Map loading={loading} recommendation={recommendation} />
          <DiveDetails recommendation={recommendation} weather={weather} loading={loading}/> 
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DivePage;
