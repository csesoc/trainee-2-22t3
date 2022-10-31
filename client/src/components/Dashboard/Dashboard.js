import { Typography, TextField, Box, Divider, Select, MenuItem, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { TaskCard } from "./TaskCards";
import { WeeklyCalendar } from './Calendar';
import "./Dashboard.css";


export default function Dashboard() {

  const [dataTasks, setDataTasks] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(0);
  const [taskProgress, setTaskProgress] = useState([]);
  const [startDate, setStartDate] = useState(dayjs(new Date()).format("DD/MM/YYYY"));
  const [endDate, setEndDate] = useState(dayjs(new Date()).format("DD/MM/YYYY"));

  let currentWeek = 7;

  const runUpdateTasks = () => {
    setUpdateTasks(updateTasks + 1);
  }

  useEffect(() => {
    fetch("http://localhost:5000/tasks/get")
      .then((res) => {
        return res.json();
      })
      .then((dataTasks) => {
        setDataTasks(dataTasks);
      });
  }, [startDate, updateTasks]);

  useEffect(() => {
    for (let i in taskProgress) {
      if (taskProgress[i] === "deleted") {
        const response = fetch(`http://localhost:5000/tasks/delete?_id=${dataTasks[i]._id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        });
      } else if (taskProgress[i] === "done") {
        
      }
    }
    runUpdateTasks();
  }, [taskProgress]);

  console.log(dataTasks);

  const TaskCardList = (taskType) => {
    let returnObj = [];
    for (let i in dataTasks) {
      let task = dataTasks[i];
      if (task.taskType === taskType) {
        let taskInfo = TaskCard(task.course, task.taskType, task.year, task.term, task.week, task.completed, taskProgress, setTaskProgress, i);
        returnObj.push(taskInfo);
      }
    }
    return returnObj;
  }

  const getTaskStats = (str) => {
    let num = 0;
    for (let i in taskProgress) {
      if (taskProgress[i] === "done") {
        num += 1;
      }
    }
    if (str === "done") { return num }
    console.log(dataTasks.length, num);
    return (dataTasks.length - num);
  }

  return (
    <>
      <div className="dashboard-container">
        <Typography variant="h2" align="center" sx={{fontWeight:"bold"}}>💀 DASHBOARD 💀</Typography>
        <div className="selector-screen">
        {WeeklyCalendar(setStartDate, setEndDate)}
        <div className="weekly-stats">
        <Divider className="week-divider" sx={{mt:0}}>WEEK {currentWeek}<br></br>
        <Typography className="week-subtext">{startDate} - {endDate}</Typography>
        </Divider>
        <Box className="week-box">
          <Typography className="weekly-box-text">Tasks done: 
          <span className="weekly-stat-counter">{getTaskStats("done")}</span></Typography>
          <Divider className="weekly-box-divider"></Divider>
          <Typography className="weekly-box-text">Tasks left: 
          <span className="weekly-stat-counter">{getTaskStats("left")}</span></Typography>
          <Divider className="weekly-box-divider"></Divider>
          <Typography className="weekly-box-text">Weekly doom:</Typography>
          <Divider className="weekly-box-divider"></Divider>
          <Typography className="weekly-box-text">Improvement:</Typography>
        </Box>
        </div>
        <Box className="create-task-box">
          Create Task
          <Divider className="create-task-box-divider"></Divider>
            <TextField
              sx={{width:"160px"}}
              className="create-task-text-field"
              id="outlined-helperText"
              label="Course Name"
              size="small"
            />
            <InputLabel id="demo-simple-select-label" sx={{lineHeight:"0.55em", overflow:"visible"}}>Term</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Term"
              size="small"
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </Select>
            <TextField
              sx={{width:"90px"}}
              id="outlined-number"
              label="Number"
              type="number"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
        </Box>
        </div>
        <Divider className="divider">LECTURES</Divider>
        <div className="divider-container">
        {TaskCardList("lecture")}
        </div>
        <Divider className="divider">TUTORIALS</Divider>
        <div className="divider-container">
        {TaskCardList("tutorial")}
        </div>
        <Divider className="divider">HOMEWORK</Divider>
        <div className="divider-container">
        {TaskCardList("homework")}
        </div>
      </div>
    </>
  )
}