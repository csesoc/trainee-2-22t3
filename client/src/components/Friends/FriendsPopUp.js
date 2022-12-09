import React from "react";
import { Button } from "@mui/material";

function Popup(props) {
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <Button className="popup-close" onClick={() => props.setTrigger(false)}>x</Button>
        { props.children }
      </div>
    </div>
  ) : "";
}

export default Popup;