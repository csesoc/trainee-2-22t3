import { Fade, Typography, Grow } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import SkullVideo from "./blue fire skull.mov.mp4";
import "./DoomFactor.css";
import zIndex from "@mui/material/styles/zIndex";

const DoomFactor = ({ updateBackgroundFireShown }) => {
  const [isShown, setIsShown] = useState(false);
  const runOnMouseEnter = () => {
    setIsShown(true);

    updateBackgroundFireShown();
  };
  const runOnMouseLeave = () => {
    setIsShown(false);

    updateBackgroundFireShown();
  };
  // useEffect(() => {
  //   fetch("http://localhost:5000/tasks/doomFactor")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => console.log(data));
  // }, []);
  return (
    <div>
      <div className="doom-factor-skull">
        {/* <div className="background-fire">
          {isShown ? (
            <Fade in={isShown} {...(isShown ? { timeout: 500 } : {})}>
              <div>
                <video loop autoPlay className="background-fire-video">
                  <source src={FireVideo} />
                </video>
              </div>
            </Fade>
          ) : (
            (zIndex = "-1")
          )}
        </div> */}
        <div
          className="doom-factor-centre"
          onMouseEnter={() => runOnMouseEnter()}
          onMouseLeave={() => runOnMouseLeave()}
        >
          <Avatar
            sx={{
              width: 200,
              height: 200,
              borderWidth: 0,
              borderColor: "black",
            }}
            className="doom-factor-avatar"
          >
            {isShown ? (
              <Grow in={isShown} {...(isShown ? { timeout: 700 } : {})}>
                <video width="500" height="500" loop autoPlay>
                  <source src={SkullVideo} type="video/mp4" />
                </video>
              </Grow>
            ) : (
              <div>Profile Picture Here</div>
            )}
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default DoomFactor;
