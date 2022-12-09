import React from "react";
import { useState, useEffect } from "react";
import { Typography, Divider, Box } from "@mui/material";
import "./MiniDashboard.css";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// New Stuff
import { calculateTaskDate } from "../Dashboard/Helpers";

const MiniDashboard = ({ dataTasks, userId }) => {
  // NEW STUFF

  // const [dataTasks, setDataTasks] = useState([]);
  const [startDate, setStartDate] = useState(
    dayjs(new Date()).format("DD/MM/YYYY")
  );
  const [endDate, setEndDate] = useState(
    dayjs(new Date()).format("DD/MM/YYYY")
  );

  const [term, setTerm] = useState(-1);
  const [week, setWeek] = useState(0);
  const [uni, setUni] = useState();
  const [taskDialog, setTaskDialog] = useState("");
  const [weeklyDoom, setWeeklyDoom] = useState({});
  const [taskProgress, setTaskProgress] = useState([]);

  const findUni = async () => {
    if (uni !== undefined) {
      return;
    }
    await fetch("http://localhost:5000/uni/get")
      .then((res) => {
        return res.json();
      })
      .then((unis) => {
        setUni(unis[0]);
      });
  };

  const findTerm = async (i) => {
    if (term !== -1) {
      return;
    }
    await findUni()
      .then(() => {
        if (i === -1) {
          i = uni.terms.length - 1;
        }
        if (new Date() > uni.terms[uni.terms.length - 1].startDate * 1000) {
          term = uni.terms[uni.terms.length - 1].term;
        }
        if (new Date() > uni.terms[i].startDate * 1000) {
          setTerm(i + 1);
        } else {
          findTerm(i - 1);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    setWeek(0);
    if (uni != undefined) {
      for (let i = 0; i < 12; i++) {
        let thisWeekDate = new Date(
          calculateTaskDate(i, term, 2022, uni).date * 1000
        );
        let nextWeekDate = new Date(
          calculateTaskDate(i + 1, term, 2022, uni).date * 1000
        );
        if (
          thisWeekDate <= new Date(dayjs(endDate, "DD/MM/YYYY")) &&
          nextWeekDate >= new Date(dayjs(endDate, "DD/MM/YYYY"))
        ) {
          setWeek(i + 1);
        }
      }
    }

    // fetch("http://localhost:5000/users/getTasks", { credentials: "include" })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((fetchedTasks) => {
    //     try {
    //       fetchedTasks = fetchedTasks.filter(
    //         (task) =>
    //           new Date(task.date * 1000) >=
    //             new Date(dayjs(startDate, "DD/MM/YYYY")) &&
    //           new Date(task.date * 1000) <=
    //             new Date(dayjs(endDate, "DD/MM/YYYY"))
    //       );
    //       fetchedTasks = fetchedTasks.sort(
    //         (a, b) => new Date(a.date) - new Date(b.date)
    //       );
    //     } catch {}
    //     setDataTasks(fetchedTasks);
    //     setTaskProgress(fetchedTasks);
    //   });
    fetch(
      `http://localhost:5000/users/weeklyDoomFactor?date=${
        new Date(dayjs(endDate, "DD/MM/YYYY")).getTime() / 1000
      }`,
      { credentials: "include" }
    )
      .then((res) => {
        return res.json();
      })
      .then((obj) => {
        console.log(obj);
        setWeeklyDoom(obj);
      });
  }, [startDate]);

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
    if (isNaN(dataTasks.length - num)) {
      return 0;
    }
    return dataTasks.length - num;
  };

  const getDoomImprovement = () => {
    return weeklyDoom.prev - weeklyDoom.curr;
  };

  ///////////////

  // const [startDate, setStartDate] = useState(
  //   dayjs(new Date()).format("DD/MM/YYYY")
  // );
  // const [endDate, setEndDate] = useState(
  //   dayjs(new Date()).format("DD/MM/YYYY")
  // );
  let currentWeek = 7;

  // const getTaskStats = (str) => {
  //   let num = 0;
  //   for (let i in dataTasks) {
  //     if (dataTasks[i].completed === true) {
  //       num += 1;
  //     }
  //   }
  //   if (str === "done") {
  //     return num;
  //   }
  //   return dataTasks.length - num;
  // };

  return (
    <div>
      <div className="weekly-stats">
        <div>
          {userId === undefined ? (
            <Link to="../dashboard" style={{ textDecoration: "none" }}>
              <Divider className="week-divider" sx={{ mt: 0 }}>
                WEEK {week}
                <Typography className="week-subtext">
                  {startDate}
                  {/* - {endDate} */}
                </Typography>
              </Divider>
            </Link>
          ) : (
            <Divider className="week-divider" sx={{ mt: 0 }}>
              WEEK {week}
              <Typography className="week-subtext">
                {startDate}
                {/* - {endDate} */}
              </Typography>
            </Divider>
          )}
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
            <Typography className="weekly-box-text">
              Weekly doom:
              <span className="weekly-stat-counter">{weeklyDoom.curr}</span>
            </Typography>
            <Divider className="weekly-box-divider"></Divider>
            <Typography className="weekly-box-text">
              Improvement:
              <span className="weekly-stat-counter">
                {getDoomImprovement()}
              </span>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default MiniDashboard;
