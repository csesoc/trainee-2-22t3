import React from "react";
import {
  Typography,
  Box,
  Link,
} from "@mui/material";
import "./Friends.css";
import Popup from "./FriendsPopUp";
import { useState, useEffect } from "react";


export default function FriendList() {
  const [friends, setFriends] = useState([]);
  const [popup, setPopup] = useState([false]);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch(("http://localhost:5000/users/friends/get"), {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(),
      });
      const json = await response.json();
      setFriends(json);
    };
    fetchFriends();
  }, []);

  const showList = friends.length ? (
    friends.map(friendObj => {
      return (
        <div className="friend-box" key={friendObj._id}>
          {/* <Typography 
            variant="h2" 
            className="friend-text" 
          >
            {friendObj.username};
          </Typography> */}
          <Link 
            // href="#" 
            underline="hover"
            component="button"
            variant="h2" 
            className="friend-text" 
            onClick={() => setPopup(true)}  
          >
            {friendObj.username};
          </Link>  
          <img 
            src={friendObj.profileImgUrl} 
            alt="profileImg"
            className="profile-image"
          ></img>          
        </div>
      );
    })
  ) : (
    <Typography 
      variant="h2" 
      className="friend-text" 
    >
      Looking a bit lonely here. Go make some friends!
    </Typography>  
  )
    
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
          {showList}
        </Box>
        <Popup trigger={popup} setTrigger={setPopup}>
          <h3>POP UP HERE</h3>
        </Popup>
      </div>
    </>
  );
}
