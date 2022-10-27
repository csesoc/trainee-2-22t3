import React from "react";
import { Typography } from "@mui/material";

const ProgressDropdownListElement = ({
  taskType,
  duration,
  completed,
  name,
  course,
  week,
  term,
  year,
}) => {
  return (
    <div>
      <div>
        <Typography variant="h6">{name}</Typography>
      </div>
      <div>
        <Typography variant="p">Duration: {duration}</Typography>
      </div>
    </div>
  );
};

export default ProgressDropdownListElement;
