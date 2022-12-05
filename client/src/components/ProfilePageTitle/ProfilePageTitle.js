import React from "react";
import { Typography } from "@mui/material";
import "./ProfilePageTitle.css";

const ProfilePageTitle = () => {
  return (
    <div>
      <Typography
        variant="h2"
        align="center"
        sx={{ fontWeight: "bold" }}
        className="profile-page-title"
      >
        💀 PROFILE TRACKER 💀
      </Typography>
    </div>
  );
};

export default ProfilePageTitle;
