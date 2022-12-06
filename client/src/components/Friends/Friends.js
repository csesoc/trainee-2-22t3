import {
  Typography,
  Box,
} from "@mui/material";
import "./Friends.css";
import { useState, useEffect } from "react";


export default function FriendList() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/users/friends/get", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(),
    });

    if (response.status === 400) {
      const res_json = await response.json();
      console.log(res_json);
    }
  };

  return (
    <>
      <div className="friends-container">
        <Typography  
          variant="h2" 
          class="friends-title" 
          align="center" 
          sx={{fontWeight:"bold"}}
        >
          💀 DOOM BUDDIES 💀
        </Typography>
        <Box className="list-box">
        </Box>
        <Box className="friend-box">

        </Box>
      </div>
    </>
  );
}
