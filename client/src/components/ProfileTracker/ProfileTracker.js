import React, { useState, useEffect } from "react";
import ProgressBarWhole from "./ProgressBarWhole";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "./ProgressTrackerStyling.css";

const ProfileTracker = () => {
  const [dataTasks, setDataTasks] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(0);

  const runUpdateTasks = () => {
    setUpdateTasks(updateTasks + 1);
    return;
  };

  useEffect(() => {
    fetch("http://localhost:5000/tasks/get")
      .then((res) => {
        return res.json();
      })
      .then((dataTasks) => {
        setDataTasks(dataTasks);
        console.log(dataTasks);
      });
  }, [updateTasks]);

  return (
    <>
      <div className="profile-tracker-container">
        <Typography variant="h5" id="profile-tracker-title">
          Tracker
        </Typography>
        {/* Filter by taskType */}
        <ProgressBarWhole
          ProgressBarType="Lectures"
          dataTasks={dataTasks.filter((task) => {
            return task.taskType === "lecture";
          })}
          runUpdateTasks={runUpdateTasks}
        />
        <ProgressBarWhole
          ProgressBarType="Tutorials"
          dataTasks={dataTasks.filter((task) => {
            return task.taskType === "tutorial";
          })}
          runUpdateTasks={runUpdateTasks}
        />
        <ProgressBarWhole
          ProgressBarType="Homework"
          dataTasks={dataTasks.filter((task) => {
            return task.taskType === "homework";
          })}
          runUpdateTasks={runUpdateTasks}
        />
      </div>
    </>
  );
};

export default ProfileTracker;
