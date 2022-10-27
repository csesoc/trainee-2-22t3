import React, { useState, useEffect } from "react";
import ProgressBarWhole from "./ProgressBarWhole";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import "./ProgressTrackerStyling.css";

const ProfileTracker = () => {
  const [dataTasks, setDataTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks/get")
      .then((res) => {
        return res.json();
      })
      .then((dataTasks) => {
        setDataTasks(dataTasks);
        console.log(dataTasks);
      });
  }, []);

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
        />
        <ProgressBarWhole
          ProgressBarType="Tutorials"
          dataTasks={dataTasks.filter((task) => {
            return task.taskType === "tutorial";
          })}
        />
        <ProgressBarWhole
          ProgressBarType="Homework"
          dataTasks={dataTasks.filter((task) => {
            return task.taskType === "homework";
          })}
        />
      </div>
    </>
  );
};

export default ProfileTracker;
