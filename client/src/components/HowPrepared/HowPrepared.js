import { Typography } from "@mui/material";
import React from "react";
import HowPreparedSelector from "./HowPreparedSelector";
import HowPreparedShare from "./HowPreparedShare";
import "./HowPrepared.css";

const HowPrepared = () => {
  return (
    <>
      <div className="how-prepared">
        <Typography variant="h5">How doomed are you feeling today?</Typography>
        <HowPreparedSelector />
        <HowPreparedShare />
      </div>
    </>
  );
};

export default HowPrepared;
