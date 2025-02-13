import { FormControl, Select, MenuItem } from "@mui/material";

type DateSelectionProps = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  dateOptions: string[];
};

const DateSelection = ({ selectedDate, setSelectedDate, dateOptions }: DateSelectionProps) => (
  <FormControl fullWidth>
    <Select
      value={selectedDate}
      onChange={(event) => setSelectedDate(event.target.value)}
      displayEmpty
      sx={{ background: "#ffffff", borderRadius: "8px", color: "#2d2d2d", fontSize: "16px" }}
    >
      {dateOptions.map((date) => (
        <MenuItem key={date} value={date}>{date}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default DateSelection;