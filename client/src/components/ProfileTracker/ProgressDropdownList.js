import React, { useEffect, useState } from "react";
import ProgressDropdownListElement from "./ProgressDropdownListElement";
import Box from "@mui/material/Box";
import { ListItem, Typography } from "@mui/material";
import { Card, Divider } from "@mui/material";

import "./ProgressTrackerStyling.css";

const ProgressDropdownList = ({
  dataTasks,
  progressBarType,
  dataTaskCompletedStatus,
  runUpdateTasks,
  sortByMode,
}) => {
  // iterates through sample data to add relevant data to dropdown
  const [ProgressDropdownList, setProgressDropdownList] = useState([]);
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    setProgressDropdownList(dataTasks);
  }, [dataTasks]);
  console.log(ProgressDropdownList);

  // Compare function for sorting list by week
  const compareByWeek = (a, b) => {
    if (a.week < b.week) {
      return -1;
    }
    if (a.week > b.week) {
      return 1;
    }
    return 0;
  };

  // Compare function for sorting list by name
  const compareByName = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  // Compare function for sorting list by name
  const compareByDate = (a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  };

  // Compare function for sorting list by name
  const compareByYear = (a, b) => {
    if (a.year < b.year) {
      return -1;
    }
    if (a.year > b.year) {
      return 1;
    }
    return 0;
  };
  const [compareBy, setCompareBy] = useState(() => compareByDate);
  useEffect(() => {
    if (sortByMode === "date") {
      setCompareBy(() => compareByDate);
    } else if (sortByMode === "week") {
      setCompareBy(() => compareByWeek);
    } else if (sortByMode === "year") {
      setCompareBy(() => compareByYear);
    } else if (sortByMode === "name") {
      setCompareBy(() => compareByName);
    }
  }, [sortByMode]);

  // loop through each element in given array and return component
  const showProgressDropdownList = ProgressDropdownList.sort(compareBy).map(
    (ListElement) => {
      return (
        <Card
          sx={{ my: 1, backgroundColor: "#3232ac", boxShadow: 4 }}
          className="progress-dropdown-list-item"
        >
          <div key={ListElement._id}>
            <ListItem>
              <ProgressDropdownListElement
                {...ListElement}
                runUpdateTasks={runUpdateTasks}
              />
            </ListItem>
          </div>
        </Card>
      );
    }
  );

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
