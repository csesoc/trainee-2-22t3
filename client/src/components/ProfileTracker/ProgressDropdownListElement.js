import React, { useEffect } from "react";
import { Typography } from "@mui/material";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const ProgressDropdownListElement = ({
  _id,
  taskType,
  duration,
  completed,
  name,
  course,
  week,
  term,
  year,
}) => {
  const handleOnDoneOutlineIcon = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: { _id: _id, completed: true },
    };
    fetch("http://localhost:5000/tasks/put", requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div>
        <Typography variant="h6">{name}</Typography>
      </div>
      <div>
        <Typography>Duration: {duration}</Typography>
      </div>
      <div>
        <IconButton onClick={handleOnDoneOutlineIcon}>
          <DoneOutlineIcon />
        </IconButton>
        <IconButton>
          <ModeEditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ProgressDropdownListElement;
