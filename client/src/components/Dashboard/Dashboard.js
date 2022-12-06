import { Typography, Box, Divider, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { TaskCard } from "./TaskCards";
import { WeeklyCalendar } from './Calendar';
import { AddTaskDialog } from "./AddTaskDialog";
import "./Dashboard.css";


export default function Dashboard() {

  const [dataTasks, setDataTasks] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(0);
  const [taskProgress, setTaskProgress] = useState([]);
  const [startDate, setStartDate] = useState(dayjs(new Date()).format("DD/MM/YYYY"));
  const [endDate, setEndDate] = useState(dayjs(new Date()).format("DD/MM/YYYY"));
  const [week, setWeek] = useState(7);
  const [term, setTerm] = useState(3);
  const [taskDialog, setTaskDialog] = useState("");

  const runUpdateTasks = () => {
    setUpdateTasks(updateTasks + 1);
  }

  useEffect(() => {

  }, []);

  useEffect(() => {
    runUpdateTasks();
  }, [taskDialog]);

  useEffect(() => {

  }, [updateTasks]);

  useEffect(() => {
    fetch("http://localhost:5000/users/getTasks", {credentials: "include"})
      .then((res) => {
        return res.json();
      })
      .then((dataTasks) => {
        setDataTasks(dataTasks);
        console.log(dataTasks);
      });
  }, [startDate, updateTasks]);

  useEffect(() => {
    for (let i in taskProgress) {
      if(dataTasks[i] == undefined) {continue;}
      if (taskProgress[i] === "deleted") {
        fetch(`http://localhost:5000/tasks/delete?_id=${dataTasks[i]._id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        });
      } else if (taskProgress[i] === "done" || taskProgress[i] === "not done") {
        let isComplete = false;
        if (taskProgress[i] === "done") {isComplete = true;}
        fetch('http://localhost:5000/tasks/put', {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({_id: dataTasks[i]._id, completed: isComplete})
        });
      }
    }
    runUpdateTasks();
  }, [taskProgress]);

  console.log(dataTasks);
  console.log(taskDialog);

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
    for (let i in dataTasks) {
      if (dataTasks[i].completed === true) {
        num += 1;
      }
    }
    if (str === "done") { return num }
    if (isNaN(dataTasks.length - num)) { return 0 }
    return (dataTasks.length - num);
  }
  const handleAddTask = (taskType) => {
    if (taskType === "lecture") {console.log("adding lecture"); setTaskDialog("lecture");}
    else if (taskType === "tutorial") {console.log("adding tutorial"); setTaskDialog("tutorial");}
    else if (taskType === "homework") {console.log("adding homework"); setTaskDialog("homework");}
  }

  return (
    <>
      <div className="dashboard-container">
        {AddTaskDialog(taskDialog, setTaskDialog, "lecture", startDate, week, term)}
        {AddTaskDialog(taskDialog, setTaskDialog, "tutorial", startDate, week, term)}
        {AddTaskDialog(taskDialog, setTaskDialog, "homework", startDate, week, term)}
        <Typography variant="h2" class="dashboard-text" align="center" sx={{fontWeight:"bold"}}>💀 DASHBOARD 💀</Typography>
        <div className="selector-screen">
        {WeeklyCalendar(setStartDate, setEndDate)}
        <div className="weekly-stats">
        <Divider className="week-divider" sx={{mt:0}}>WEEK {week}<br></br>
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
        </div>
        <div className="tasks-container">
        <Divider className="tasks-divider">LECTURES</Divider>
        <div className="divider-container">
        {TaskCardList("lecture")}
        <Fab size="big" className="add-task-icon" onClick={() => handleAddTask("lecture")} aria-label="add" sx={{backgroundColor: "rgb(55, 55, 172)"}}>
        <AddIcon className="add-task-icon-sign"/>
        </Fab>
        </div>
        <Divider className="tasks-divider">TUTORIALS</Divider>
        <div className="divider-container">
        {TaskCardList("tutorial")}
        <Fab size="big" className="add-task-icon" onClick={() => handleAddTask("tutorial")} aria-label="add" sx={{backgroundColor: "rgb(55, 55, 172)"}}>
        <AddIcon className="add-task-icon-sign"/>
        </Fab>
        </div>
        <Divider className="tasks-divider">HOMEWORK</Divider>
        <div className="divider-container">
        {TaskCardList("homework")}
        <Fab size="big" className="add-task-icon" onClick={() => handleAddTask("homework")} aria-label="add" sx={{backgroundColor: "rgb(55, 55, 172)"}}>
        <AddIcon className="add-task-icon-sign"/>
        </Fab>
        </div>
        </div>
      </div>
    </>
  )
}