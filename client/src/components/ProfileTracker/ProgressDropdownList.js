import React, { useEffect, useState } from "react";
import ProgressDropdownListElement from "./ProgressDropdownListElement";
import Box from "@mui/material/Box";
import { ListItem, Typography } from "@mui/material";
import { Card, Divider } from "@mui/material";

const ProgressDropdownList = ({
  dataTasks,
  progressBarType,
  dataTaskCompletedStatus,
}) => {
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
      <Card
        sx={{ my: 1, backgroundColor: "#3232ac", boxShadow: 4 }}
        className="progress-dropdown-list-item"
      >
        <div key={ListElement._id}>
          <ListItem>
            <ProgressDropdownListElement {...ListElement} />
          </ListItem>
        </div>
      </Card>
    );
  });

  let progressListTitle;
  if (dataTaskCompletedStatus) {
    progressListTitle = `${progressBarType} finished`;
  } else {
    progressListTitle = `${progressBarType} yet to complete`;
  }

  return (
    <div className="progress-dropdown-list">
      <Divider className="divider" sx={{ boxShadow: 4 }}>
        <Typography className="progress-dropdown-list-title">
          {progressListTitle}
        </Typography>
      </Divider>

      <Box className="progress-dropdown-list-box">
        {showProgressDropdownList}
      </Box>
    </div>
  );
};

export default ProgressDropdownList;
