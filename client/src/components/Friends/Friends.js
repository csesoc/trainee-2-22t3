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
        <div className="friend-box" sx={{p: 4}} key={friendObj._id}>
          <img 
            src={friendObj.profileImgUrl} 
            alt="profile"
            className="profile-image"
          ></img>
          <Link 
            underline="hover"
            component="button"
            variant="h2" 
            className="friend-text" 
            onClick={() => setPopup(true)}  
          >
            {friendObj.username}
          </Link>            
        </div>
      );
    })
  ) : (
    <Typography 
      variant="h2" 
      className="u-lonely-ass"
      align="center"  
    >
      Looking a bit lonely here. Go make some friends! 🐸
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
        <Box className="list-box" sx={{p: 4}}>
          {showList}
        </Box>
        <Popup trigger={popup} setTrigger={setPopup}>
          <h3>POP UP HERE</h3>
        </Popup>
      </div>
    </>
  );
}
