import React from "react";
import { useState, useEffect } from "react";
import BackgroundFireVideo from "./background fire pepe.mp4";
import "./BackgroundFire.css";
import { Fade, Grow, CardMedia, Typography } from "@mui/material";

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
      <div className="background-fire-class-profile-tracker">
        <Fade
          in={isShownBackgroundFireVideo}
          {...(isShownBackgroundFireVideo ? { timeout: 1000 } : {})}
        >
          <CardMedia
            component="video"
            className="background-fire-video-fade-in"
            src={BackgroundFireVideo}
            autoPlay
            muted
          />
          {/* <video loop autoPlay className="background-fire-video-fade-in">
            <source src={BackgroundFireVideo} />
          </video> */}
        </Fade>
      </div>

      <Grow in={isShown} timeout={1500}>
        <div className="doom-factor-number">
          {/* <Typography
            variant="h2"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "100px",
              color: `rgb(200, ${200 - doomFactor * 2}, ${
                200 - doomFactor * 2
              })`,
            }}
            className="doom-factor-number-typography"
          >
            {doomFactor}
          </Typography> */}
          <h1 className="doom-factor-number-typography">{doomFactor}</h1>
        </div>
      </Grow>
    </div>
  );
};

export default BackgroundFire;
