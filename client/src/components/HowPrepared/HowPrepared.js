import { Typography } from "@mui/material";
import React from "react";
import HowPreparedSelector from "./HowPreparedSelector";
import HowPreparedShare from "./HowPreparedShare";
import "./HowPrepared.css";

const HowPrepared = ({ userId }) => {
  // console.log("Hello");
  // console.log(userId);
  return (
    <>
      <div className="how-prepared">
        <Typography
          className="how-prepared-title"
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          DAILY CHECK IN
        </Typography>
        <HowPreparedSelector userId={userId} />
        <HowPreparedShare />
      </div>
    </>
  );
};

export default HowPrepared;
