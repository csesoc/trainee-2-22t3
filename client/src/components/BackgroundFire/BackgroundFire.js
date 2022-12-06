import React from "react";
import { useState } from "react";
import BackgroundFireVideo from "./background fire.mp4";
import "./BackgroundFire.css";
import { Fade } from "@mui/material";

const BackgroundFire = ({ isShown }) => {
  const [doomFactor, setDoomFactor] = useState(59);
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
