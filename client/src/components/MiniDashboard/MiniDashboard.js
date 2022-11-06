import React from "react";
import { useState } from "react";
import { Typography, Divider, Box } from "@mui/material";

const MiniDashboard = () => {
  const [dataTasks, setDataTasks] = useState([]);
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
