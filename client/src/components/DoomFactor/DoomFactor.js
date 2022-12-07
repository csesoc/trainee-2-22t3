import { Fade, Typography, Grow, Slide } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import SkullVideo from "./blue fire skull.mov.mp4";
import "./DoomFactor.css";
import zIndex from "@mui/material/styles/zIndex";
import FireVideo from "../BackgroundFire/background fire.mp4";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";

const DoomFactor = ({ updateBackgroundFireShown }) => {
  const [isShown, setIsShown] = useState(false);
  const [isShownOptionMenu, setIsShownOptionMenu] = useState(false);

  const runOnMouseEnter = () => {
    setIsShown(true);
    updateBackgroundFireShown();
  };

  const runOnMouseLeave = () => {
    setIsShown(false);
    updateBackgroundFireShown();
  };

  const handleShowOptionMenu = () => {
    setIsShownOptionMenu(true);
  };

  const handleCloseOptionMenu = () => {
    setIsShownOptionMenu(false);
  };
  // useEffect(() => {
  //   fetch("http://localhost:5000/tasks/doomFactor")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => console.log(data));
  // }, []);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div>
      {/* <div className="background-fire">
        <Fade in={isShown} {...(isShown ? { timeout: 500 } : { timeout: 500 })}>
          <div>
            <video loop autoPlay className="background-fire-video">
              <source src={FireVideo} />
            </video>
          </div>
        </Fade>
      </div> */}
      <div className="doom-factor-skull">
        <div
          className="doom-factor-centre"
          onMouseEnter={() => runOnMouseEnter()}
          onMouseLeave={() => runOnMouseLeave()}
          onClick={handleShowOptionMenu}
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
            <Grow in={isShown} {...(isShown ? { timeout: 700 } : {})}>
              <video width="500" height="500" loop autoPlay>
                <source src={SkullVideo} type="video/mp4" />
              </video>
            </Grow>
          </Avatar>
        </div>
        <Dialog
          open={isShownOptionMenu}
          // TransitionComponent={Transition}
          onClose={handleCloseOptionMenu}
          maxWidth="m"
          PaperProps={{
            style: {
              backgroundColor: "rgb(96, 99, 106)",
              border: "solid",
              borderColor: "#36393f",
              borderWidth: "5px",
              borderRadius: "10px",
            },
          }}
        >
          <DialogTitle>Options</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Button variant="contained">Change Profile Picture</Button>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DoomFactor;
