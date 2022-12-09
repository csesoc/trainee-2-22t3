import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./CourseAdd.css";
import { Link } from "react-router-dom";

const names = ["asdf", "bvdsa"];

const CourseAdd = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  useEffect(() => {
    const getCourses = async () => {
      const response = await fetch("http://localhost:5000/courses/get", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const courses = await response.json();
      setCourses(courses);
      setCourse(courses[0]._id.toString());
      console.log(courses, course);
    };
    getCourses();
  }, []);

  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  const handleAddCourse = async () => {
    console.log(course);
    fetch("http://localhost:5000/users/addCourse", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        courseId: course,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setSuccess(true);
          setErrorMsg(false);
        } else {
          setSuccess(false);
          setErrorMsg(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <div className="title-div">
          <Link to="../tracker">
            <Button variant="contained">Home</Button>
          </Link>
          <Typography variant="h1" className="title" align="center">
            Add Course
          </Typography>
        </div>
        <div className="form-container">
          <InputLabel id="demo-simple-select-label">Course</InputLabel>
          <Select
            defaultValue=""
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={course}
            label="Courses"
            onChange={handleChange}
            sx={{ mb: 3, mt: 1 }}
          >
            {courses.map((item) => (
              <MenuItem value={item._id}>{item.courseName}</MenuItem>
            ))}
          </Select>
        </div>
        <Button
          variant="contained"
          color="secondary"
          sx={{ fontWeight: "bold" }}
          onClick={handleAddCourse}
        >
          Add Course
        </Button>
        {success === true ? <p>Course added</p> : <></>}
        {errorMsg === true ? <p>Course already enrolled</p> : <></>}
      </div>
    </>
  );
};

export default CourseAdd;
