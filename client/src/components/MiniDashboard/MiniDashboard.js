import React from "react";
import { useState } from "react";
import { Typography, Divider, Box } from "@mui/material";
import "./MiniDashboard.css";
import dayjs from "dayjs";

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

  return (
    <div>
      <div>
        <Divider className="week-divider" sx={{ mt: 0 }}>
          WEEK {currentWeek}
          <br></br>
          <Typography className="week-subtext">
            {startDate} - {endDate}
          </Typography>
        </Divider>
      </div>
      <div>
        <Box className="week-box">
          <Typography className="weekly-box-text">
            Tasks done:
            <span className="weekly-stat-counter">{getTaskStats("done")}</span>
          </Typography>
          <Divider className="weekly-box-divider"></Divider>
          <Typography className="weekly-box-text">
            Tasks left:
            <span className="weekly-stat-counter">{getTaskStats("left")}</span>
          </Typography>
          <Divider className="weekly-box-divider"></Divider>
          <Typography className="weekly-box-text">Weekly doom:</Typography>
          <Divider className="weekly-box-divider"></Divider>
          <Typography className="weekly-box-text">Improvement:</Typography>
        </Box>
      </div>
    </div>
  );
};

export default MiniDashboard;
