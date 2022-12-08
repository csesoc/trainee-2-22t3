import React from "react";
import {
  Typography,
  Box,
  Button,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material";
import "./Friends.css";
import { useState, useEffect } from "react";

export default function FriendList() {
  const [friends, setFriends] = useState([]);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch(("http://localhost:5000/users/friends/get"), {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        qs: {},
      });
      const json = await response.json();
      setFriends(json);
    };
    fetchFriends();
  }, [friends]);

  const removeFriend = async (_id) => {
    console.log(`HERE ${_id}`);
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
        <div className="friend-box" key={friendObj._id} onClick={() => setPopup(true)}>
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
          <Button className="remove-friend" onClick={() => removeFriend(friendObj._id)}>Remove</Button>  
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
        <Box className="list-box" sx={{p: 3}}>
          {showList}
        </Box>
        <Dialog
          open={popup}
          onClose={() => setPopup(false)}
          maxWidth="m"
          PaperProps={{
            style: {
              backgroundColor: "rgb(96, 99, 106)",
              border: "solid",
              borderColor: "#36393f",
              borderWidth: "5px",
              borderRadius: "10px",
            },
          }}
        >
          <DialogContent>
            FRIENDS STUFF HERE
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
