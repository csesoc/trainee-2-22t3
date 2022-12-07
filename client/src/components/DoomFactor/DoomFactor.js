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
import Paper from "@mui/material/Paper";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";

const DoomFactor = ({ updateBackgroundFireShown }) => {
  const [isShown, setIsShown] = useState(false);
  const [isShownOptionMenu, setIsShownOptionMenu] = useState(false);
  const [showDoomFactor, setShowDoomFactor] = useState(false);

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

  const handleCheckboxShowDoomFactor = () => {
    setShowDoomFactor(!showDoomFactor);
  };

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
          onMouseEnter={() => {
            if (!showDoomFactor) {
              runOnMouseEnter();
            }
          }}
          onMouseLeave={() => {
            if (!showDoomFactor) {
              runOnMouseLeave();
            }
          }}
          onClick={handleShowOptionMenu}
        >
          <Avatar
            sx={{
              width: 200,
              height: 200,
              borderWidth: 0,
              borderColor: "black",
              left: showDoomFactor ? "150px" : "0px",
            }}
            className="doom-factor-avatar"
          >
            <Typography
              sx={{
                color: "black",
              }}
            >
              Profile Picture Here
            </Typography>
            <Grow
              in={isShown}
              {...(isShown ? { timeout: 700 } : {})}
              className="avatar-flaming-skull-video"
            >
              <video width="500" height="500" loop autoPlay>
                <source src={SkullVideo} type="video/mp4" />
              </video>
            </Grow>
          </Avatar>
          <div className="doom-factor-words">
            <Grow
              in={showDoomFactor}
              className="show-doom-factor-grow"
              {...(showDoomFactor ? { timeout: 1000 } : {})}
            >
              <Typography
                className="doom-part"
                variant="h1"
                align="right"
                sx={{ fontWeight: "bold" }}
                left="-180px"
                top="-190px"
              >
                DOOM
              </Typography>
            </Grow>

            <Grow
              in={showDoomFactor}
              className="show-doom-factor-grow"
              {...(showDoomFactor ? { timeout: 1000 } : {})}
            >
              <Typography
                className="factor-part"
                variant="h2"
                fontSize="60px"
                align="right"
                sx={{ fontWeight: "bold" }}
                left="-130px"
                top="-90px"
              >
                FACTOR
              </Typography>
            </Grow>
          </div>
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
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showDoomFactor}
                      onClick={handleCheckboxShowDoomFactor}
                    />
                  }
                  label="Show Doom Factor"
                />
              </FormGroup>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DoomFactor;
