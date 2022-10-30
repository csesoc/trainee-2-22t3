import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import ProgressDropdownList from "./ProgressDropdownList";
import { white } from "@mui/material/colors";
import ProgressBarDropdownButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CompletedListDropdown from "./CompletedListDropdown";
import DropdownButton from "@mui/material/IconButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import "./ProgressTrackerStyling.css";

const ProgressBarWhole = ({ ProgressBarType, dataTasks }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleClickDropdownOpen = () => {
    setDropdownOpen(true);
  };
  const handleClickDropdownClose = () => {
    setDropdownOpen(false);
  };

  // Filter by completed status
  let completedTasks = dataTasks.filter((task) => {
    return task.completed === true;
  });
  let uncompletedTasks = dataTasks.filter((task) => {
    return task.completed === false;
  });

  let dialogTitle;
  if (completedTasks < uncompletedTasks) {
    dialogTitle = "💀 You are DOOMED 💀";
  } else {
    dialogTitle = "Not bad 😊";
  }

  let expandCompletedIcon = <ArrowRightIcon />;
  const [completedListIsShown, setCompletedListIsShown] = useState(false);
  const handleClickExpandCompleted = () => {
    if (completedListIsShown === true) {
      setCompletedListIsShown(false);
      expandCompletedIcon = <ArrowLeftIcon />;
    } else {
      setCompletedListIsShown(true);
      expandCompletedIcon = <ArrowRightIcon />;
    }
  };

  return (
    <>
      <div className="progress-bar-whole">
        <div
          className="progress-bar-label"
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }} // positions button next to label name
        >
          <Typography
            variant="h6"
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {ProgressBarType}
          </Typography>
          <ProgressBarDropdownButton onClick={handleClickDropdownOpen}>
            <ArrowDropDownIcon style={{ color: "white" }} />
          </ProgressBarDropdownButton>
          <Dialog
            open={dropdownOpen}
            onClose={handleClickDropdownClose}
            maxWidth="m"
            PaperProps={{
              style: {
                backgroundColor: "rgb(96, 99, 106)",
                border: "solid",
                borderColor: "#36393f",
                borderWidth: "5px",
                borderRadius: "10px",
              },
            }}
            className="dialog-box"
          >
            <DialogTitle align="center" id="dialog-title">
              {dialogTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText className="dialog-content">
                {/* Uncompleted Tasks */}
                <ProgressDropdownList
                  dataTasks={uncompletedTasks}
                  progressBarType={ProgressBarType}
                  dataTaskCompletedStatus={false}
                />
                {/* Completed Tasks */}
                {completedListIsShown && (
                  <ProgressDropdownList
                    dataTasks={completedTasks}
                    progressBarType={ProgressBarType}
                    dataTaskCompletedStatus={true}
                  />
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickDropdownClose}>Close</Button>
            </DialogActions>
            <DialogActions className="completed-tasks-dropdown">
              <DropdownButton onClick={handleClickExpandCompleted}>
                {expandCompletedIcon}
              </DropdownButton>
            </DialogActions>
          </Dialog>
        </div>
        <div className="progress-bar">
          <ProgressBar
            done={(completedTasks.length / dataTasks.length) * 100}
          />
        </div>
      </div>
    </>
  );
};

// const ProgressBarDropdown = ({ onClose }) => {
//   return (
//     <DialogTitle>
//       {onClose ? (
//         <ProgressBarDropdownButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </ProgressBarDropdownButton>
//       ) : null}
//     </DialogTitle>
//   );
// };

export default ProgressBarWhole;
