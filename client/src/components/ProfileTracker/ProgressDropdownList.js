import React, { useEffect, useState } from "react";
import ProgressDropdownListElement from "./ProgressDropdownListElement";
import Box from "@mui/material/Box";
import { ListItem } from "@mui/material";

const ProgressDropdownList = ({ data, progressType }) => {
  // iterates through sample data to add relevant data to dropdown
  const [ProgressDropdownList, setProgressDropdownList] = useState([]);
  useEffect(() => {
    let listElementsToAdd = data.tasks.filter(
      (task) => task.taskType === progressType
    );
    listElementsToAdd = listElementsToAdd.filter(
      (task) => task.completed === "false"
    );
    setProgressDropdownList(listElementsToAdd);
  }, [data]);
  console.log(ProgressDropdownList);
  return (
    <div>
      <Box
        sx={{
          width: 400,
        }}
      >
        {/* loop through each element in given array and return component*/}
        {ProgressDropdownList.map((ListElement) => {
          return (
            <div key={ListElement._id}>
              <ListItem sx={{ border: 1, my: 1 }}>
                <ProgressDropdownListElement {...ListElement} />
              </ListItem>
            </div>
          );
        })}
      </Box>
    </div>
  );
};

export default ProgressDropdownList;
