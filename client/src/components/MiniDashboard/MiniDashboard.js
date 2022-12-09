import React from "react";
import { useState, useEffect } from "react";
import { Typography, Divider, Box } from "@mui/material";
import "./MiniDashboard.css";
import dayjs from "dayjs";
import { calculateTaskDate } from "../Dashboard/Helpers";

const MiniDashboard = ({ dataTasks }) => {
  const [startDate, setStartDate] = useState(
    dayjs(new Date()).format("DD/MM/YYYY")
  );
  const [endDate, setEndDate] = useState(
    dayjs(new Date()).format("DD/MM/YYYY")
  );
  let currentWeek = 7;

  const getTaskStats = (str) => {
    let num = 0;
    for (let i in dataTasks) {
      if (dataTasks[i].completed === true) {
        num += 1;
      }
    }
    if (str === "done") {
      return num;
    }
    return dataTasks.length - num;
  };

  // const [dataTasks, setDataTasks] = useState([]);
  // const [updateTasks, setUpdateTasks] = useState(0);
  // const [taskProgress, setTaskProgress] = useState([]);
  // const [taskChanged, setTaskChanged] = useState(0);
  // const [startDate, setStartDate] = useState(
  //   dayjs(new Date()).format("DD/MM/YYYY")
  // );
  // const [endDate, setEndDate] = useState(
  //   dayjs(new Date()).format("DD/MM/YYYY")
  // );
  // const [term, setTerm] = useState(-1);
  // const [week, setWeek] = useState(0);
  // const [uni, setUni] = useState();
  // const [taskDialog, setTaskDialog] = useState("");

  // useEffect(() => {
  //   setWeek(0);
  //   if (uni != undefined) {
  //     for (let i = 0; i < 12; i++) {
  //       let thisWeekDate = new Date(
  //         calculateTaskDate(i, term, 2022, uni).date * 1000
  //       );
  //       let nextWeekDate = new Date(
  //         calculateTaskDate(i + 1, term, 2022, uni).date * 1000
  //       );
  //       if (
  //         thisWeekDate <= new Date(dayjs(endDate, "DD/MM/YYYY")) &&
  //         nextWeekDate >= new Date(dayjs(endDate, "DD/MM/YYYY"))
  //       ) {
  //         setWeek(i + 1);
  //       }
  //     }
  //   }

  //   fetch("http://localhost:5000/users/getTasks", { credentials: "include" })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((fetchedTasks) => {
  //       try {
  //         fetchedTasks = fetchedTasks.filter(
  //           (task) =>
  //             new Date(task.date) >= new Date(dayjs(startDate, "DD/MM/YYYY")) &&
  //             new Date(task.date) <= new Date(dayjs(endDate, "DD/MM/YYYY"))
  //         );
  //         fetchedTasks = fetchedTasks.sort(
  //           (a, b) => new Date(a.date) - new Date(b.date)
  //         );
  //       } catch {}
  //       setDataTasks(fetchedTasks);
  //       setTaskProgress(fetchedTasks);
  //     });
  // }, [startDate, updateTasks]);

  return (
    <div>
      <div className="weekly-stats">
        <div>
          <Divider className="week-divider" sx={{ mt: 0 }}>
            WEEK {currentWeek}
            <Typography className="week-subtext">
              {startDate} - {endDate}
            </Typography>
          </Divider>
        </div>
        <div>
          <Box className="week-box">
            <Typography className="weekly-box-text">
              Tasks done:
              <span className="weekly-stat-counter">
                {getTaskStats("done")}
              </span>
            </Typography>
            <Divider className="weekly-box-divider"></Divider>
            <Typography className="weekly-box-text">
              Tasks left:
              <span className="weekly-stat-counter">
                {getTaskStats("left")}
              </span>
            </Typography>
            <Divider className="weekly-box-divider"></Divider>
            <Typography className="weekly-box-text">Weekly doom:</Typography>
            <Divider className="weekly-box-divider"></Divider>
            <Typography className="weekly-box-text">Improvement:</Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default MiniDashboard;
