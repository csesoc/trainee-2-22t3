import React, { useState } from "react";
import DropdownButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const CompletedListDropdown = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    console.log("Clicked CompletedListDropdown Button");
    setOpen(true);
  };
  return (
    <div>
      <DropdownButton onClick={handleOpen}>
        <ArrowRightIcon />
      </DropdownButton>
    </div>
  );
};

export default CompletedListDropdown;
