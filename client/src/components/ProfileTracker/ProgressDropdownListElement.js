import React, { useEffect, useState } from "react";
import { fabClasses, Typography } from "@mui/material";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";

import "./ProgressTrackerStyling.css";
import env from "react-dotenv";

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
  userId,
}) => {
  const [updateCompletedStatus, setUpdateCompletedStatus] = useState();
  const handleToggleCompletedIcon = () => {
    if (completed === true) {
      completed = false;
    } else {
      completed = true;
    }
    const putRequestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: _id,
        completed: completed,
      }),
      // qs: { _id: _id, completed: completed },
      credentials: "include",
    };

    fetch(env.BE_URL + "/tasks/put", putRequestOptions)
      .then(() => runUpdateTasks())
      .catch((error) => console.log(error));
  };

  const handleDeleteIcon = () => {
    const deleteRequestOptions = {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    fetch(`${env.BE_URL}/tasks/delete?_id=${_id}`, deleteRequestOptions)
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
    <div /*className={completed ? "dropdown-list-element-fade-out" : ""}*/>
      <Typography variant="h6">{name}</Typography>

      <Typography>Duration: {duration}</Typography>
      <Typography>Week: {week}</Typography>
      <Typography>
        Term {term}, {year}
      </Typography>
      {userId === undefined ? (
        <div>
          <IconButton onClick={handleToggleCompletedIcon}>
            {toggleCompletedIcon}
          </IconButton>
          <IconButton>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteIcon}>
            <DeleteIcon />
          </IconButton>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProgressDropdownListElement;
