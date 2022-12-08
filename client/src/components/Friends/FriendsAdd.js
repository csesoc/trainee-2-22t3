import React from "react";
import {
  Typography,
  Box,
  Button,
  Divider,
  Link,
  CardMedia,
} from "@mui/material";
import "./Friends.css";
import BackgroundFireVideo from "../BackgroundFire/background fire.mp4";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FriendList() {
  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();

  const openFriendPage = (friend) => {
    navigate(`/tracker/${friend}`);
  }

  useEffect(() => {
    // REPLACE WITH SEARCH BAR
  //   const fetchFriends = async () => {
  //     const response = await fetch(("http://localhost:5000/users/friends/get"), {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       credentials: "include",
  //       qs: {},
  //     });
  //     const json = await response.json();
  //     setFriends(json);
  //   };
  //   fetchFriends();
  }, [friends]);

  // THIS BECOMES ADD FRIEND **when friend added should also be deleted off all users (not friends) list
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
      Wow you BNOC. Congratulations, you have befriend EVERYONE on Doom Tracker! 👍
    </Typography>  
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
        <Typography>CHUCK IN SEARCH BAR HERE</Typography>
        <Link to="/friends">
          <Button 
            type="submit" 
            sx={{ fontWeight: "normal" }}
            // make css for this className
            className="back-friend-link" 
          >
            Add Friend
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
