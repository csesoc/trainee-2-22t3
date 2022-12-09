import React from "react";
import {
  Typography,
  Box,
  Button,
  Divider,
  CardMedia,
  ListItemIcon,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import "./Friends.css";
import BackgroundFireVideo from "../BackgroundFire/background fire.mp4";
import ProfileSearchBar from "../DoomBuddies/ProfileSearchBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FriendList() {
  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();

  const openFriendPage = (friend) => {
    navigate(`/tracker/${friend}`);
  }

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch(("http://localhost:5000/users/friends/get"), {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const json = await response.json();
      setFriends(json);
    };
    fetchFriends();
  }, [friends]);

  const removeFriend = async (_id) => {
    const response = await fetch(("http://localhost:5000/users/friends/delete"), {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({_id:_id}),
    });
    const json = await response.json();
    console.log(json);
    setFriends(json);
  };

  const showList = (friends.length) ? (
    friends.map(friendObj => {
      return (
        <div className="friend-box" key={friendObj._id} onClick={() => openFriendPage(friendObj._id)}>
          <img 
            src={friendObj.profileImg} 
            alt="profile"
            width="60"
            height="60"
            className="profile-image"
          ></img>
          <Typography 
            component="button"
            variant="h2" 
            className="friend-text" 
          >
            {friendObj.username}
          </Typography>
          <Button className="remove-friend" onClick={e => {e.stopPropagation(); removeFriend(friendObj._id)}}>Remove</Button>  
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
      <div className="return-profile"> 
        <Button 
          href="/tracker"
          sx={{ fontWeight: "normal" }}
          className="profile-button" 
        >
          <ListItemIcon>
            <PersonIcon className="profile-icon" color="info"></PersonIcon>
          </ListItemIcon>
        </Button>
      </div>
      <div className="friends-container">
        <Typography  
          variant="h2" 
          className="friends-title" 
          align="center" 
          sx={{fontWeight:"bold"}}
        >
          💀 DOOM BUDDIES 💀
        </Typography>
        <Divider 
          variant="middle" 
          style={{width:'100%'}} 
          className="friends-divider"
        />
        <ProfileSearchBar currentFriends={true} notFriends={false}></ProfileSearchBar>
        <Button 
          href="/friends/add"
          sx={{ fontWeight: "normal" }}
          variant="contained"
          className="friend-button white-button" 
        >
          Add Friend
        </Button>
        {/* style={{overflowY: "auto", overflowX: "hidden", height: "60vh"}} */}
        <Box className="list-box" sx={{p: 3}}>
          {showList}
        </Box>
      </div>
      <div className="background-fire-class">
        <CardMedia
          component="video"
          src={BackgroundFireVideo}
          autoPlay
          loop
          muted
        />
      </div>
    </>
  );
}
