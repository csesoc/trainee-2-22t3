import React, { useEffect, useState } from "react";
import ProgressDropdownListElement from "./ProgressDropdownListElement";
import Box from "@mui/material/Box";
import { ListItem } from "@mui/material";

const ProgressDropdownList = ({ dataTasks, progressBarType }) => {
  // iterates through sample data to add relevant data to dropdown
  const [ProgressDropdownList, setProgressDropdownList] = useState([]);
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    setProgressDropdownList(dataTasks);
  }, [dataTasks]);
  console.log("ProgressDropdownList: ");
  console.log(ProgressDropdownList);

  // loop through each element in given array and return component
  const showProgressDropdownList = ProgressDropdownList.map((ListElement) => {
    return (
      <div key={ListElement._id} className="progress-dropdown-list-item">
        <ListItem sx={{ border: 1, my: 1 }}>
          <ProgressDropdownListElement {...ListElement} />
        </ListItem>
      </div>
    );
  });

  return (
    <div>
      <div>{progressBarType} yet to complete</div>
      <Box
        sx={{
          width: 400,
        }}
      >
        {showProgressDropdownList}
      </Box>
    </div>
  );
};

export default ProgressDropdownList;
