import React from "react";
import {
  Typography,
  Box,
  Button,
  Divider,
  CardMedia,
} from "@mui/material";
import "./Friends.css";
import BackgroundFireVideo from "../BackgroundFire/background fire.mp4";
import ProfileSearchBar from "../DoomBuddies/ProfileSearchBar";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function FriendList() {
  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();

  const openFriendPage = (friend) => {
    navigate(`/tracker/${friend}`);
  }

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("http://localhost:5000/users/notFriends/get", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const users = await response.json();
      setFriends(users);
    }
    getUsers();
  }, [friends]);


  const addFriend = async (_id) => {
    const response = await fetch(("http://localhost:5000/users/friends/post"), {
      method: "POST",
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
            width="70"
            height="70"
            className="profile-image"
          ></img>
          <Typography 
            component="button"
            variant="h2" 
            className="friend-text" 
          >
            {friendObj.username}
          </Typography>
          <Button className="remove-friend" onClick={e => {e.stopPropagation(); addFriend(friendObj._id)}}>Add</Button>  
        </div>          
      );
    })
  ) : (
    <Typography></Typography>  
  )
    
  return (
    <>
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
        <ProfileSearchBar currentFriends={false} notFriends={true}></ProfileSearchBar>
        <Link to="/friends" className="add-friend-link">
          <Button 
            type="submit" 
            sx={{ fontWeight: "normal" }}
            // make css for this className
            className="back-friend-button" 
          >
            All Friends
          </Button>
        </Link>
        <Box className="list-box" sx={{p: 3}}>
          {showList}
        </Box>
        <div className="background-fire-class">
          <CardMedia
            component="video"
            src={BackgroundFireVideo}
            autoPlay
            loop
          />
        </div>
      </div>
    </>
  );
}
