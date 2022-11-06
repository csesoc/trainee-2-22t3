import { Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import "./DoomFactor.css";

const DoomFactor = () => {
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
        <Typography
          variant="h1"
          sx={{
            fontSize: 200,
          }}
        >
          💀
        </Typography>
      </div>
    </div>
  );
};

export default DoomFactor;
