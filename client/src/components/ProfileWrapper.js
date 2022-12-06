import React from "react";
import { useEffect, useState } from "react";
import ProfilePageTitle from "./ProfilePageTitle/ProfilePageTitle";
import ProfileTracker from "./ProfileTracker/ProfileTracker";
import HowPrepared from "./HowPrepared/HowPrepared";
import DoomFactor from "./DoomFactor/DoomFactor";
import DoomBuddiesListButton from "./DoomBuddiesList/DoomBuddiesListButton";
import "./ProfileStyling.css";
import MiniDashboard from "./MiniDashboard/MiniDashboard";
import BackgroundFire from "./BackgroundFire/BackgroundFire";
import { useParams } from "react-router-dom";
import { Divider, Fade } from "@mui/material";

const ProfileWrapper = () => {
  const [dataTasks, setDataTasks] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(0);
  const [backgroundFireShown, setBackgroundFireShown] = useState(false);

  const runUpdateTasks = () => {
    setUpdateTasks(updateTasks + 1);
    return;
  };

  const updateBackgroundFireShown = () => {
    if (backgroundFireShown == false) {
      setBackgroundFireShown(true);
    } else {
      setBackgroundFireShown(false);
    }
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
          console.log("useEffect");
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
        });
    }
  }, [updateTasks]);

  return (
    <div className="profile-wrapper">
      {backgroundFireShown && <BackgroundFire isShown={backgroundFireShown} />}
      <ProfilePageTitle className="profile-page-title" />
      <div className="profile-doom-buddies-list-button">
        <DoomBuddiesListButton />
      </div>
      <DoomFactor updateBackgroundFireShown={updateBackgroundFireShown} />
      <Divider className="profile-section-divider">DOOM TRACKER</Divider>
      <div className="profile-mini-dashboard-tracker">
        <div className="profile-mini-dashboard">
          <MiniDashboard dataTasks={dataTasks} />
        </div>
        <div className="profile-tracker-profile">
          <ProfileTracker
            runUpdateTasks={runUpdateTasks}
            dataTasks={dataTasks}
            id={id}
            updateTasks={updateTasks}
          />
        </div>
      </div>

      <Divider className="profile-section-divider">DOOM SELECTOR</Divider>
      <div className="how-prepared-profile">
        <HowPrepared />
      </div>
    </div>
  );
};

export default ProfileWrapper;
