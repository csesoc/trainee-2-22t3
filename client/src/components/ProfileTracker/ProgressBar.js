import React, { useEffect } from "react";
import { useState } from "react";
import "./ProgressBarStyling.css";

const ProgressBar = ({ done }) => {
  const [ProgressBarPercentage, setProgressBarPercentage] = useState({});
  const [ProgressBarBackgroundStyling, setProgressBarBackgroundStyling] =
    useState({});
  const [
    ProgressBarPercentageBackgroundStyling,
    setProgressBarPercentageBackgroundStyling,
  ] = useState({});

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
      const updateProgressBarPercentageBackgroundStyling = {
        width: `${done}%`,
      };
      setProgressBarPercentageBackgroundStyling(
        updateProgressBarPercentageBackgroundStyling
      );
    }, 0);
  }, [done]);

  return (
    <>
      <div className="progress" style={ProgressBarBackgroundStyling}>
        <div
          className="progress-done-background"
          style={ProgressBarPercentageBackgroundStyling}
        ></div>
        <div className="progress-done" style={ProgressBarPercentage}>
          {/* {done}% */}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
