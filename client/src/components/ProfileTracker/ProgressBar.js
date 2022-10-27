import React, { useEffect } from "react";
import { useState } from "react";
import "./ProgressBarStyling.css";

const ProgressBar = ({ done }) => {
  const [ProgressBarPercentage, setProgressBarPercentage] = useState({});

  // useEffect to ensure infinite looping does NOT occur
  useEffect(() => {
    setTimeout(() => {
      const updateProgressBarPercentage = {
        opacity: 1,
        width: `${done}%`,
      };
      setProgressBarPercentage(updateProgressBarPercentage);
    }, 0);
  }, [done]);

  return (
    <>
      <div className="progress">
        <div className="progress-done" style={ProgressBarPercentage}>
          {done}%
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
