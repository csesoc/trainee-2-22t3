import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel } from '@mui/material';
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
      <InputLabel className="dialog-box-text">Term</InputLabel>
      <Select
        value={1}
      >
        <MenuItem value={1}>One</MenuItem>
        <MenuItem value={2}>Two</MenuItem>
        <MenuItem value={3}>Three</MenuItem>
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
      </div>
    </DialogContent>
    <DialogActions>
      {/* <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Subscribe</Button> */}
    </DialogActions>
  </Dialog>
  );
}