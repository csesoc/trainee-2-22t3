import React from "react";
import { useState } from "react";
import { Button, Icon, IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import testImage from "./testImage.jpg";
import { Snackbar } from "@mui/material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const HowPreparedShare = () => {
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const handleClickDropdownOpen = () => {
    setShareDropdownOpen(true);
  };
  const handleClickDropdownClose = () => {
    setShareDropdownOpen(false);
  };

  const [copyClipboardStatus, setCopyClipboardStatus] = useState(false);
  const handleDoomCertificateClick = () => {
    navigator.clipboard.writeText(testImage);
    setCopyClipboardStatus(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<ShareIcon />}
        onClick={handleClickDropdownOpen}
      >
        Share
      </Button>
      <Dialog
        open={shareDropdownOpen}
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
      >
        <DialogContent className="how-prepared-share-dialog-content">
          Doom Certificate
          <img
            src={testImage}
            width="400px"
            onClick={handleDoomCertificateClick}
          ></img>
          <div>
            <IconButton>Doom Buddies</IconButton>
            <IconButton>
              <FacebookIcon />
            </IconButton>
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton>Discord</IconButton>
          </div>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={copyClipboardStatus}
        onClose={() => setCopyClipboardStatus(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </div>
  );
};

export default HowPreparedShare;
