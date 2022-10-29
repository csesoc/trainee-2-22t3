import { Typography, TextField, Card, CardActions, CardContent, Box, Slider, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import './Dashboard.css';

export function TaskCard (course, taskType, year, term, week, completed, progress, setProgress, num) {

  const generateCardColor = () => {
    const r = 255 - (205 * progress[num] * 0.01);
    const g = 255 - (205 * progress[num] * 0.01);
    const b = 255 - (83 * progress[num] * 0.01);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }

  const handleSliderChange = (event) => {
    let newProgress = [...progress];
    newProgress[num] = event;
    setProgress(newProgress);
  }

  return(
    <Card className='task-card' sx={{backgroundColor: () => generateCardColor()}}>
    <CardContent sx={{pb: 0}}>
      <Typography className="task-card-header" variant="h5" align="center" sx={{fontWeight:"bold"}}>
        {course}
      </Typography>
      <Typography className="task-card-text1" sx={{mb:0, mt:0}}>
        {year}T{term} Week {week}<br></br>{taskType}
      </Typography>
    </CardContent>
    <CardActions sx={{pt: 0}}>
    <Slider
      size="big"
      defaultValue={0}
      onChange={(event) => handleSliderChange(event.target.value)}
      sx={{width:150, margin:"0 auto", color:"#3232ac"}}
      />
    </CardActions>
    </Card>
  )
}