import { Typography } from "@mui/material";
import React from "react";
import HowPreparedSelector from "./HowPreparedSelector";
import HowPreparedShare from "./HowPreparedShare";

const HowPrepared = () => {
  return (
    <div>
      <Typography variant="h5">How doomed are you feeling today?</Typography>
      <HowPreparedSelector />
      <HowPreparedShare />
    </div>
  );
};

export default HowPrepared;
