import { Typography, Box, Divider, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { TaskCard } from "./TaskCards";
import { WeeklyCalendar } from './Calendar';
import { AddTaskDialog } from "./AddTaskDialog";
import "./Dashboard.css";
import { calculateTaskDate } from "./Helpers";


export default function Dashboard() {

  const [dataTasks, setDataTasks] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(0);
  const [taskProgress, setTaskProgress] = useState([]);
  const [taskChanged, setTaskChanged] = useState(0);
  const [startDate, setStartDate] = useState(dayjs(new Date()).format("DD/MM/YYYY"));
  const [endDate, setEndDate] = useState(dayjs(new Date()).format("DD/MM/YYYY"));
  const [term, setTerm] = useState(-1);
  const [week, setWeek] = useState(0);
  const [uni, setUni] = useState();
  const [taskDialog, setTaskDialog] = useState("");
  const [weeklyDoom, setWeeklyDoom] = useState([]);

  const findUni = async () => {
    if (uni !== undefined) {return;}
    await fetch("http://localhost:5000/uni/get")
    .then((res) => {
      return res.json();
    })
    .then((unis) => {
      setUni(unis[0]);
    });
  }

  const findTerm = async (i) => {
    if (term !== -1) {return;}
    await findUni()
    .then(() => {
      if (i === -1) {i = uni.terms.length - 1;}
      if (new Date() > uni.terms[uni.terms.length - 1].startDate * 1000) {term = uni.terms[uni.terms.length - 1].term;}
      if (new Date() > uni.terms[i].startDate * 1000) {
        setTerm(i + 1);
      }
      else {findTerm( i - 1);}
    }).catch(() => {})
  };

  findTerm(-1);

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
    setWeek(0);
    if (uni != undefined) {  
      for (let i = 0; i < 12; i++) {
      let thisWeekDate = new Date(calculateTaskDate(i, term, 2022, uni).date * 1000);
      let nextWeekDate = new Date(calculateTaskDate(i + 1, term, 2022, uni).date * 1000);
      if (thisWeekDate <= new Date(dayjs(endDate, "DD/MM/YYYY"))
      && nextWeekDate >= new Date(dayjs(endDate, "DD/MM/YYYY"))) {setWeek(i + 1);}
      }
    }

    fetch("http://localhost:5000/users/getTasks", {credentials: "include"})
      .then((res) => {
        return res.json();
      })
      .then((fetchedTasks) => {
        try{
          fetchedTasks = fetchedTasks.filter(task => new Date(task.date) >= new Date(dayjs(startDate, "DD/MM/YYYY")) && new Date(task.date) <= new Date(dayjs(endDate, "DD/MM/YYYY")));
          fetchedTasks = fetchedTasks.sort((a,b) => new Date(a.date) - new Date(b.date));
        } catch{};
        setDataTasks(fetchedTasks);
        setTaskProgress(fetchedTasks);
      });
      fetch(`http://localhost:5000/users/weeklyDoomFactor?=${dayjs(endDate, "DD/MM/YYYY")}`, {credentials: "include"})
      .then((res) => {
        return res.json();
      })
      .then((obj) => {
        console.log(obj);
        setWeeklyDoom(obj);
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
  }, [taskChanged]);

  const TaskCardList = (taskType) => {
    let returnObj = [];
    for (let i in dataTasks) {
      let task = dataTasks[i];
      if (task.taskType === taskType) {
        let taskInfo = TaskCard(task.name, task.course, task.date, task.duration, task.completed, taskProgress, setTaskProgress, i, taskChanged, setTaskChanged);
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
    if (taskType === "lecture") {setTaskDialog("lecture");}
    else if (taskType === "tutorial") {setTaskDialog("tutorial");}
    else if (taskType === "homework") {setTaskDialog("homework");}
  }

  return (
    <>
      <div className="dashboard-container">
        {AddTaskDialog(taskDialog, setTaskDialog, "lecture", startDate, week, term)}
        {AddTaskDialog(taskDialog, setTaskDialog, "tutorial", startDate, week, term)}
        {AddTaskDialog(taskDialog, setTaskDialog, "homework", startDate, week, term)}
        <Typography variant="h2" class="dashboard-text" align="center" sx={{fontWeight:"bold"}}>💀 DASHBOARD 💀</Typography>
        <div className="selector-screen">
        {WeeklyCalendar(setStartDate, setEndDate, setWeek, uni, term)}
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
          <Typography className="weekly-box-text">Weekly doom:
          <span className="weekly-stat-counter">{weeklyDoom[0]}</span></Typography>
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