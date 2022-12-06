import React from "react";
import { useState, useEffect } from "react";
import BackgroundFireVideo from "./background fire.mp4";
import "./BackgroundFire.css";
import { Fade } from "@mui/material";

const BackgroundFire = ({ isShown, id }) => {
  const [doomFactor, setDoomFactor] = useState(59);
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
  }, []);
  return (
    <div>
      <div className="background-fire-class">
        <Fade in={isShown === true} timeout={500}>
          <video loop autoPlay muted className="background-fire-video">
            <source src={BackgroundFireVideo} />
          </video>
        </Fade>
      </div>
      <Fade in={isShown} timeout={500}>
        <div className="doom-factor-number">{doomFactor}</div>
      </Fade>
    </div>
  );
};

export default BackgroundFire;
