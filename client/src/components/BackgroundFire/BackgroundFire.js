import React from "react";
import { useState, useEffect } from "react";
import BackgroundFireVideo from "./background fire.mp4";
import "./BackgroundFire.css";
import { Fade, Grow, CardMedia } from "@mui/material";

const BackgroundFire = ({ isShown, id, doomFactor }) => {
  const [isShownBackgroundFireVideo, setIsShownBackgroundFireVideo] =
    useState(false);
  const [backgroundVideoFade, setBackgrounDireVideoFade] = useState(
    "background-fire-video-fade-in"
  );

  useEffect(() => {
    if (isShown) {
      setBackgrounDireVideoFade("background-fire-video-fade-in");
      setIsShownBackgroundFireVideo(true);
    } else {
      setBackgrounDireVideoFade("background-fire-video-fade-out");
      setIsShownBackgroundFireVideo(false);
    }
  }, [isShown]);

  // const [doomFactor, setDoomFactor] = useState(0);
  // const getRequestOptions = {
  //   method: "GET",
  //   credentials: "include",
  // };
  // useEffect(() => {
  //   if (id === undefined) {
  //     fetch(`http://localhost:5000/users/doomFactor`, getRequestOptions)
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => setDoomFactor(data.doomFactor));
  //   } else {
  //     fetch(
  //       `http://localhost:5000/tasks/doomFactor?userId=${id}`,
  //       getRequestOptions
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => setDoomFactor(data.doomFactor));
  //   }
  // }, []);

  return (
    <div>
      <div className="background-fire-class">
        <Fade
          in={isShownBackgroundFireVideo}
          {...(isShownBackgroundFireVideo ? { timeout: 1000 } : {})}
        >
          <CardMedia
            component="video"
            className="background-fire-video-fade-in"
            src={BackgroundFireVideo}
            autoPlay
          />
          {/* <video loop autoPlay className="background-fire-video-fade-in">
            <source src={BackgroundFireVideo} />
          </video> */}
        </Fade>
      </div>

      <Grow in={isShown} timeout={1500}>
        <div className="doom-factor-number">{doomFactor}</div>
      </Grow>
    </div>
  );
};

export default BackgroundFire;
