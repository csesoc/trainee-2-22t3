import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, Switch, Button } from '@mui/material';
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import './Dashboard.css';

export function AddTaskDialog(open, taskType) {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open === taskType) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    console.log(isOpen);
  }, [open]);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen("")}>
    <DialogTitle>Create new {taskType}</DialogTitle>
    <DialogContent>
    <div className="dialog-box">
      <div className="text-field-box">
      <InputLabel className="dialog-box-text">Name</InputLabel>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        type="text"
        fullWidth
      />
      </div>
      <div className="text-field-box">
      <InputLabel className="dialog-box-text">Course ID</InputLabel>
      <TextField
        autoFocus
        margin="dense"
        id="courseId"
        type="text"
        fullWidth
      />
      </div>
      <div>
        <InputLabel className="switch-box-text">Completed</InputLabel>
        <div className="switch-box-underline"></div>
        <Switch />
      </div>
      <div className="select-box">
      <InputLabel className="dialog-box-text">Task Type</InputLabel>
      <Select
        value={10}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      </div>
      <div className="select-box">
      <InputLabel className="dialog-box-text">Week</InputLabel>
      <Select
        value={1}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={11}>11</MenuItem>

      </Select>
      </div>
      <div className="select-box">
      <InputLabel className="dialog-box-text">Day</InputLabel>
      <Select
        value={1}
      >
        <MenuItem value={0}>Sunday</MenuItem>
        <MenuItem value={1}>Monday</MenuItem>
        <MenuItem value={2}>Tuesday</MenuItem>
        <MenuItem value={3}>Wednesday</MenuItem>
        <MenuItem value={4}>Thursday</MenuItem>
        <MenuItem value={5}>Friday</MenuItem>
        <MenuItem value={6}>Saturday</MenuItem>
      </Select>
      </div>
      <div className="time-picker">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start time"
            value={1}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="time-picker">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="End time"
            value={1}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div>
        <Button variant="contained" className="dialog-submit-button">Create</Button>
      </div>
      </div>
    </DialogContent>
    <DialogActions>
      {/* <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Subscribe</Button> */}
    </DialogActions>
  </Dialog>
  );
}