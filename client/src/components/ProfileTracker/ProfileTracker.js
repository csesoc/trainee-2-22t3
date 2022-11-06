import React, { useState, useEffect } from "react";
import ProgressBarWhole from "./ProgressBarWhole";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "./ProgressTrackerStyling.css";
import { useParams } from "react-router-dom";

const ProfileTracker = () => {
  const [dataTasks, setDataTasks] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(0);

  const runUpdateTasks = () => {
    setUpdateTasks(updateTasks + 1);
    return;
  };
  const { id } = useParams();

  useEffect(() => {
    if (id === undefined) {
      fetch("http://localhost:5000/users/getTasks", {
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((dataTasks) => {
          setDataTasks(dataTasks);
          console.log(dataTasks);
        });
    } else {
      fetch("http://localhost:5000/tasks/get", {
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((dataTasks) => {
          setDataTasks(
            dataTasks.filter((task) => {
              return task.userId === id;
            })
          );
          console.log(dataTasks);
        });
    }
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
          userId={id}
        />
        <ProgressBarWhole
          ProgressBarType="Tutorials"
          dataTasks={dataTasks.filter((task) => {
            return task.taskType === "tutorial";
          })}
          runUpdateTasks={runUpdateTasks}
          userId={id}
        />
        <ProgressBarWhole
          ProgressBarType="Homework"
          dataTasks={dataTasks.filter((task) => {
            return task.taskType === "homework";
          })}
          runUpdateTasks={runUpdateTasks}
          userId={id}
        />
      </div>
    </>
  );
};

export default ProfileTracker;
