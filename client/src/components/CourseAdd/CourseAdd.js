import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import "./CourseAdd.css";

const CourseAdd = () => {
  const [age, setAge] = React.useState("");

  useEffect(() => {}, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <div className="container">
        <div className="title-div">
          <Typography variant="h1" className="title" align="center">
            Add Course
          </Typography>
        </div>
        <div className="form-container">
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Courses"
            onChange={handleChange}
            sx={{ mb: 3, mt: 1 }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
      </div>
    </>
  );
};

export default CourseAdd;
