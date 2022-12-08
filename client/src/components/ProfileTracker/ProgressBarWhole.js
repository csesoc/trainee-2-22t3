import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import ProgressDropdownList from "./ProgressDropdownList";
import { white } from "@mui/material/colors";
import ProgressBarDropdownButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CompletedListDropdown from "./CompletedListDropdown";
import DropdownButton from "@mui/material/IconButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import "./ProgressTrackerStyling.css";

import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Check from "@mui/icons-material/Check";
import ListItemIcon from "@mui/material/ListItemIcon";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 110,
    backgroundColor: "rgb(96, 99, 106)",
    // theme.palette.mode === "light"
    //   ? "rgb(55, 55, 172)"
    //   : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        // color: "#36393f",
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: "#36393f",
        // backgroundColor: alpha(
        //   theme.palette.primary.main,
        //   theme.palette.action.selectedOpacity
        // ),
      },
    },
  },
}));

const ProgressBarWhole = ({
  ProgressBarType,
  dataTasks,
  runUpdateTasks,
  userId,
}) => {
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

  // let expandCompletedIcon = <ArrowRightIcon />;
  const [completedListIsShown, setCompletedListIsShown] = useState(false);
  const handleClickExpandCompleted = () => {
    if (completedListIsShown === true) {
      setCompletedListIsShown(false);
    } else {
      setCompletedListIsShown(true);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openSortByMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [sortByMode, setSortByMode] = useState("date");
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseByDate = () => {
    // setAnchorEl(null);
    setSortByMode("date");
  };
  const handleCloseByWeek = () => {
    // setAnchorEl(null);
    setSortByMode("week");
  };
  const handleCloseByYear = () => {
    // setAnchorEl(null);
    setSortByMode("year");
  };
  const handleCloseByName = () => {
    // setAnchorEl(null);
    setSortByMode("name");
  };

  const [isCompactView, setIsCompactView] = useState(false);

  return (
    <>
      <div className="progress-bar-whole">
        <div
          className="progress-bar-header"
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }} // positions button next to label name
        >
          <Typography variant="h6" className="progress-bar-label">
            {ProgressBarType}
          </Typography>
          {userId === undefined ? (
            <ProgressBarDropdownButton onClick={handleClickDropdownOpen}>
              <ArrowDropDownIcon
                style={{ color: "white" }}
                className="progress-bar-dropdown-button"
              />
            </ProgressBarDropdownButton>
          ) : (
            <></>
          )}

          <Typography className="progress-bar-percentage">
            {dataTasks.length === 0 ? (
              <>Task List Empty</>
            ) : (
              <>
                {Math.floor((completedTasks.length / dataTasks.length) * 100)}%
              </>
            )}
          </Typography>
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
              <IconButton
                variant="contained"
                startIcon={<KeyboardArrowDownIcon />}
                className="progress-bar-sort-by-button"
                aria-controls={
                  openSortByMenu ? "demo-customized-menu" : undefined
                }
                aria-haspopup="true"
                aria-expanded={openSortByMenu ? "true" : undefined}
                onClick={handleClick}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={openSortByMenu}
                onClose={handleClose}
              >
                <MenuItem onClick={handleCloseByDate} disableRipple>
                  Date
                  {sortByMode === "date" && (
                    <ListItemIcon
                      className="sort-by-check-mark"
                      sx={{
                        justifyContent: "right",
                      }}
                    >
                      <Check />
                    </ListItemIcon>
                  )}
                </MenuItem>
                <MenuItem onClick={handleCloseByWeek} disableRipple>
                  Week
                  {sortByMode === "week" && (
                    <ListItemIcon
                      className="sort-by-check-mark"
                      sx={{
                        justifyContent: "right",
                      }}
                    >
                      <Check />
                    </ListItemIcon>
                  )}
                </MenuItem>
                {/* <Divider sx={{ my: 0.5 }} /> */}
                <MenuItem onClick={handleCloseByYear} disableRipple>
                  Year
                  {sortByMode === "year" && (
                    <ListItemIcon
                      className="sort-by-check-mark"
                      sx={{
                        justifyContent: "right",
                      }}
                    >
                      <Check />
                    </ListItemIcon>
                  )}
                </MenuItem>
                <MenuItem onClick={handleCloseByName} disableRipple>
                  Name
                  {sortByMode === "name" && (
                    <ListItemIcon
                      className="sort-by-check-mark"
                      sx={{
                        justifyContent: "right",
                      }}
                    >
                      <Check />
                    </ListItemIcon>
                  )}
                </MenuItem>
                <MenuItem>Compact View</MenuItem>
              </StyledMenu>
              <DialogContentText className="dialog-content">
                {/* Uncompleted Tasks */}
                <ProgressDropdownList
                  dataTasks={uncompletedTasks}
                  progressBarType={ProgressBarType}
                  dataTaskCompletedStatus={false}
                  runUpdateTasks={runUpdateTasks}
                  sortByMode={sortByMode}
                />
                {/* Completed Tasks */}
                {completedListIsShown && (
                  <ProgressDropdownList
                    dataTasks={completedTasks}
                    progressBarType={ProgressBarType}
                    dataTaskCompletedStatus={true}
                    runUpdateTasks={runUpdateTasks}
                    sortByMode={sortByMode}
                  />
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickDropdownClose}>Close</Button>
            </DialogActions>
            <DialogActions className="completed-tasks-dropdown">
              <DropdownButton onClick={handleClickExpandCompleted}>
                {completedListIsShown === true ? (
                  <ArrowLeftIcon />
                ) : (
                  <ArrowRightIcon />
                )}
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
