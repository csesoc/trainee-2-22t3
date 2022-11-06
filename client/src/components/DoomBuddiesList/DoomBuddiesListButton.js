import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import { Typography } from "@mui/material";

const DoomBuddiesListButton = () => {
  return (
    <div>
      <div>
        <ListItemButton
          sx={{
            borderRadius: 15,
          }}
        >
          <Typography>Doom Buddies</Typography>
        </ListItemButton>
      </div>
    </div>
  );
};

export default DoomBuddiesListButton;
