import { Fade, Typography, Grow, Slide } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import SkullVideo from "./blue fire skull.mov.mp4";
import "./DoomFactor.css";
import zIndex from "@mui/material/styles/zIndex";
import FireVideo from "../BackgroundFire/background fire.mp4";
import FireEmbersVideo from "./doom factor view background fire embers.mp4";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CardMedia,
} from "@mui/material";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";

import AvatarProfileImage from "./testProfileImage.jpg";

const DoomFactor = ({
  updateBackgroundFireShown,
  doomFactor,
  id,
  updateCounterProfileWrapper,
}) => {
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

  const [uploadProfileTrackerImage, setUploadProfileTrackerImage] =
    useState("");
  const [profileTrackerImage, setProfileTrackerImage] = useState("");
  const [updateCounter, setUpdateCounter] = useState(0);

  const runUpdateCounter = () => {
    setUpdateCounter(updateCounter + 1);
  };

  const handleUploadProfileImg = () => {
    const formData = new FormData();
    // console.log("LOLOL");
    // console.log(uploadProfileTrackerImage);
    formData.append("avatar", profileTrackerImage);
    // for (var key of formData.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }
    const postProfileImgRequestOptions = {
      method: "POST",
      // headers: {
      //   "Content-type": "multipart/form-data",
      // },
      credentials: "include",
      body: formData,
    };
    fetch(
      "http://localhost:5000/users/uploadProfileImg",
      postProfileImgRequestOptions
    )
      .then(() => runUpdateCounter())
      .then(() => console.log(updateCounter));
  };
  const getProfileImgRequestOptions = {
    method: "GET",
    credentials: "include",
  };
  useEffect(() => {
    console.log("updateCounter");
    console.log(updateCounterProfileWrapper);
    if (id === undefined) {
      fetch(
        `http://localhost:5000/users/getProfileImg`,
        getProfileImgRequestOptions
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setProfileTrackerImage(data.profileImgUrl);
          console.log(profileTrackerImage);
        })
        .catch((error) => console.log(error));
    } else {
      fetch(
        `http://localhost:5000/tasks/getOtherProfileImg?userId=${id}`,
        getProfileImgRequestOptions
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setProfileTrackerImage(data.otherProfileImg);
        })
        .then((data) => console.log(data.otherProfileImg))
        .catch((error) => console.log(error));
    }
  }, [updateCounter, updateCounterProfileWrapper]);

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
              left: showDoomFactor ? "130px" : "0px",
            }}
            className="doom-factor-avatar"
          >
            {/* <Typography
              sx={{
                color: "black",
                opacity: showDoomFactor ? "0.5" : "1",
              }}
            >
              Profile Picture Here
            </Typography> */}
            <Avatar
              src={profileTrackerImage}
              sx={{
                width: 200,
                height: 200,
                borderWidth: 0,
                borderColor: "black",
                opacity: showDoomFactor ? "0.5" : "1",
              }}
              className="doom-factor-avatar-profile-picture"
            />

            <Grow
              in={showDoomFactor}
              {...(showDoomFactor ? { timeout: 700 } : {})}
              className="avatar-flaming-skull-video"
            >
              <Typography
                sx={{
                  color: "black",
                  opacity: showDoomFactor ? "1" : "0",
                  fontWeight: "bold",
                }}
                className="doom-factor-value"
                variant="h1"
              >
                {doomFactor}
              </Typography>
            </Grow>
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
                fontSize="85px"
                align="right"
                sx={{ fontWeight: "bold", color: "rgb(55, 55, 172)" }}
                left="-145px"
                top="-180px"
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
                fontSize="55px"
                align="right"
                sx={{ fontWeight: "bold", color: "rgb(117, 117, 174)" }}
                left="-110px"
                top="-90px"
              >
                FACTOR
              </Typography>
            </Grow>
          </div>
          <div className="doom-factor-background-fire-embers">
            {/* <Fade in={showDoomFactor}> */}
            <video loop autoPlay muted>
              <source src={FireEmbersVideo} />
            </video>
            {/* </Fade> */}
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
              {id === undefined ? (
                <div>
                  <Button variant="contained" component="label">
                    Change Profile Picture
                    <input
                      accept="image/*"
                      multiple
                      hidden
                      type="file"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setProfileTrackerImage(file);
                        // console.log(profileTrackerImage);
                      }}
                    />
                  </Button>
                  <Button variant="contained" onClick={handleUploadProfileImg}>
                    Upload
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DoomFactor;
