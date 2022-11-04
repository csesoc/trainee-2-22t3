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
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        type="text"
        fullWidth
      />
      <div className="select-box">
      <InputLabel className="select-box-text">Task Type</InputLabel>
      <Select
        value={10}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
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