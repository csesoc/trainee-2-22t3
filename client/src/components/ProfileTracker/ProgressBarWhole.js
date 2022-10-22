import { useState } from "react";
import ProgressBar from "./ProgressBar";
import ProgressDropdownList from "./ProgressDropdownList";

import ProgressBarDropdownButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import sampleData from "../sampleData";

const ProgressBarWhole = ({ ProgressBarType }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleClickDropdownOpen = () => {
    setDropdownOpen(true);
  };
  const handleClickDropdownClose = () => {
    setDropdownOpen(false);
  };
  return (
    <div>
      <div
        className="ProgressBarLabel"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }} // positions button next to label name
      >
        <Typography variant="h6">{ProgressBarType}</Typography>
        <ProgressBarDropdownButton onClick={handleClickDropdownOpen}>
          <ArrowDropDownIcon />
        </ProgressBarDropdownButton>
        <Dialog open={dropdownOpen} onClose={handleClickDropdownClose}>
          <DialogTitle id="dialog-title">
            {ProgressBarType} yet to complete
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <ProgressDropdownList
                data={sampleData}
                progressType={ProgressBarType}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickDropdownClose}>
              OK, I'll get to work
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <ProgressBar done={100 - sampleData.tasks.length} />
    </div>
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
