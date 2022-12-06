import {
  Typography,
  Box,
} from "@mui/material";
import "./Friends.css";

export default function FriendList() {
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
          <Typography className="normal-text">Friends: 
          </Typography> 
        </Box>
        <Box className="friend-box">

        </Box>
      </div>
    </>
  );
}
