import React, { useEffect, useState } from "react";
import { fabClasses, Typography } from "@mui/material";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";

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
  runUpdateTasks,
}) => {
  const [updateCompletedStatus, setUpdateCompletedStatus] = useState();
  const handleToggleCompletedIcon = () => {
    if (completed === true) {
      completed = false;
    } else {
      completed = true;
    }
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: _id,
        completed: completed,
      }),
      credentials: "include",
    };

    fetch("http://localhost:5000/tasks/put", requestOptions)
      .then(() => runUpdateTasks())
      .catch((error) => console.log(error));
  };

  let toggleCompletedIcon;
  if (completed === false) {
    toggleCompletedIcon = <DoneOutlineIcon />;
  } else {
    toggleCompletedIcon = <UndoIcon />;
  }
  return (
    <div>
      <div>
        <Typography variant="h6">{name}</Typography>
      </div>
      <div>
        <Typography>Duration: {duration}</Typography>
      </div>
      <div>
        <IconButton onClick={handleToggleCompletedIcon}>
          {toggleCompletedIcon}
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
