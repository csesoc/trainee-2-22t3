import { Button, Dialog, DialogContent, DialogTitle, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import './Dashboard.css';

export function AddTaskDialog(taskDialog, setTaskDialog, taskType, startDate, week, term) {

  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [day, setDay] = useState(1);
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [errors, setErrors] = useState([false, false, false]);

  useEffect(() => {
    if (taskDialog === taskType) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [taskDialog]);

  const handleClose = () => {
    setName("");
    setCourseId("");
    setDuration(0);
    setTaskDialog("");
    setIsOpen(false);
  }

  useEffect(() => {
    
  }, [])

  const handleSubmit = () => {
    if (name === "") { setErrors([true, false, false]); return;}
    if (courseId === "") { setErrors([false, true, false]); return;}
    if (duration === 0 || isNaN(duration)) {setErrors([false, false, true]); return;}
    let taskDate = dayjs(startDate, "DD/MM/YYYY") + (day * 1000 * 60 * 60 * 24);
    taskDate += 1000 * 60 * ((60 * new Date(time).getHours()) + new Date(time).getMinutes());
    const date = new Date(taskDate);
    fetch('http://localhost:5000/tasks/post', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        taskType: taskType,
        duration: (duration * 3600),
        completed: false,
        name: name,
        course: courseId,
        date: taskDate,
        week: week,
        term: term,
        year: date.getYear() + 1900,
      })
    });
    handleClose();
  }

  return (
    <Dialog open={isOpen} onClose={() => handleClose()}>
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
        error={errors[0]}
        fullWidth
        onChange={(event) => setName(event.target.value)}
      />
      </div>
      <div className="text-field-box">
      <InputLabel className="dialog-box-text">Course ID</InputLabel>
      <TextField
        autoFocus
        margin="dense"
        id="courseId"
        type="text"
        error={errors[1]}
        fullWidth
        onChange={(event) => setCourseId(event.target.value)}
      />
      </div>
      <div className="select-box">
      <InputLabel className="dialog-box-text">Day</InputLabel>
      <Select
        value={day}
        onChange={(event) => setDay(event.target.value)}
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
            value={time}
            renderInput={(params) => <TextField {...params} />}
            onChange={(value) => setTime(value)}
          />
        </LocalizationProvider>
      </div>
      <div className="duration-box">
      <InputLabel className="dialog-box-text">Duration</InputLabel>
      <OutlinedInput
          endAdornment={<InputAdornment position="end">hours</InputAdornment>}
          InputLabelProps={{
            shrink: true,
          }}
          error={errors[2]}
          onChange={(event) => setDuration(event.target.value)}
      />
      </div>
      <div>
        <Button variant="contained" className="dialog-submit-button" onClick={() => handleSubmit()}>Create</Button>
      </div>
      </div>
    </DialogContent>
  </Dialog>
  );
}