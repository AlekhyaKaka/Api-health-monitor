import { TextField } from '@mui/material';

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <TextField
      size="small"
      value={selectedDate}
      fullWidth
      type="date"
      minWidth={200}
      label="Select Date"
      onChange={(e) => setSelectedDate(e.target.value)}
      sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' }, minWidth: 110 }}
    />
  );
};
export default CustomDatePicker;
