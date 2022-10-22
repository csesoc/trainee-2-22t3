import React from "react";
import ProgressBarWhole from "./ProgressBarWhole";
import { Typography } from "@mui/material";

const ProfileTracker = () => {
  return (
    <div>
      <Typography variant="h5">Tracker</Typography>
      <ProgressBarWhole ProgressBarType="lecture" />
      <ProgressBarWhole ProgressBarType="tutorial" />
      <ProgressBarWhole ProgressBarType="homework" />
    </div>
  );
};

export default ProfileTracker;
