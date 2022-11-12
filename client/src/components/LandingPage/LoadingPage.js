


import { LinearProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";


export default function LandingPage() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  // ADD: jump to landing.js after hit 100
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          navigate('/landing');
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    
    return () => {
      clearInterval(timer);
    };
  }, [navigate]);

  return (
    <>
      <div class="landing-container">
        <img 
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/microsoft/310/skull_1f480.png" 
          alt="skull"
          class="landing-skull"
        ></img>
        <Typography variant="h2" class="landing-text">Get ready to know how DOOMED you are</Typography>  
        <LinearProgress variant="determinate" value={progress} class="loading-bar"/>  
      </div>
    </>
  )
}
