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
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Divider, Fade, Typography } from "@mui/material";
import ProfileSearchBar from "./DoomBuddies/ProfileSearchBar";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

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

  const [authUserId, setAuthUserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (id !== undefined) {
      fetch("http://localhost:5000/users/getAuthUserId", {
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => setAuthUserId(data.authUserId))
        .then(() => {
          if (authUserId === id) {
            navigate("/tracker");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [updateTasks]);

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
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`http://localhost:5000/tasks/get/${id}`, {
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setDataTasks(data);
        })
        // .then((dataTasks) => {
        //   setDataTasks(
        //     dataTasks.filter((task) => {
        //       return task.userId === id;
        //     })
        //   );
        // })
        .catch((error) => console.log(error));
    }
  }, [updateTasks, id]);

  const [doomFactor, setDoomFactor] = useState(0);
  const getRequestOptions = {
    method: "GET",
    credentials: "include",
  };
  useEffect(() => {
    if (id === undefined) {
      fetch(`http://localhost:5000/users/doomFactor`, getRequestOptions)
        .then((res) => {
          return res.json();
        })
        .then((data) => setDoomFactor(data.doomFactor));
    } else {
      fetch(
        `http://localhost:5000/tasks/doomFactor?userId=${id}`,
        getRequestOptions
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => setDoomFactor(data.doomFactor));
    }
  }, [updateTasks]);

  const [profileUsername, setProfileUsername] = useState("Loading...");
  useEffect(() => {
    if (id === undefined) {
      fetch(`http://localhost:5000/users/getUsername`, getRequestOptions)
        .then((res) => {
          return res.json();
        })
        .then((data) => setProfileUsername(data.username));
    } else {
      fetch(
        `http://localhost:5000/tasks/getOtherUsername?userId=${id}`,
        getRequestOptions
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => setProfileUsername(data.otherUsername));
    }
  });

  return (
    <div className="profile-wrapper">
      {backgroundFireShown && (
        <BackgroundFire
          isShown={backgroundFireShown}
          id={id}
          doomFactor={doomFactor}
        />
      )}
      {/* <div> */}
      <div className="profile-tracker-search-bar">
        <ProfileSearchBar runUpdateTasks={runUpdateTasks}></ProfileSearchBar>
      </div>

      <br />
      <ProfilePageTitle className="profile-page-title" />
      {/* <ProfilePageTitle /> */}
      {/* <div className="profile-doom-buddies-list-button"> */}
      {id === undefined ? (
        <div className="profile-doom-buddies-list-button">
          <Link to="../friends">
            <Button variant="contained">Doom Buddies</Button>
          </Link>
          <Link to="../CourseAdd">
            <Button variant="contained">Add Course</Button>
          </Link>
        </div>
      ) : (
        <div className="profile-doom-buddies-list-button">
          <Link to="../tracker" onClick={runUpdateTasks}>
            <Button variant="contained">Home</Button>
          </Link>
        </div>
      )}

      <DoomFactor
        updateBackgroundFireShown={updateBackgroundFireShown}
        doomFactor={doomFactor}
        id={id}
        updateCounterProfileWrapper={updateTasks}
      />
      <Divider>
        <Typography variant="h3">{profileUsername}</Typography>
      </Divider>
      <Divider className="profile-section-divider">DOOM TRACKER</Divider>
      <div className="profile-mini-dashboard-tracker">
        <div className="profile-mini-dashboard">
          <MiniDashboard dataTasks={dataTasks} userId={id} />
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
        <HowPrepared userId={id} runUpdateTasks={runUpdateTasks} />
      </div>
    </div>
  );
};

export default ProfileWrapper;
