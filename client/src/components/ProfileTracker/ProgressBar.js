import React, { useEffect } from "react";
import { useState } from "react";
import "./ProgressBarStyling.css";

const ProgressBar = ({ done }) => {
  const [ProgressBarPercentage, setProgressBarPercentage] = useState({});
  const [ProgressBarBackgroundStyling, setProgressBarBackgroundStyling] =
    useState({});

  // useEffect to ensure infinite looping does NOT occur
  useEffect(() => {
    setTimeout(() => {
      const updateProgressBarPercentage = {
        opacity: 1,
        width: `${done}%`,
        backgroundColor: `rgb(255, 0, 0)`,
      };
      setProgressBarPercentage(updateProgressBarPercentage);
      const updateProgressBarBackgroundStyling = {
        backgroundColor: `rgba(150,150, 172, ${(100 - done) / 100})`,
      };
      setProgressBarBackgroundStyling(updateProgressBarBackgroundStyling);
    }, 0);
  }, [done]);

  return (
    <>
      <div className="progress" style={ProgressBarBackgroundStyling}>
        <div className="progress-done" style={ProgressBarPercentage}>
          {/* {done}% */}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
