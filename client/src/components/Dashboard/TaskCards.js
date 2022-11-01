import { Typography, Card, CardActions, CardContent } from '@mui/material';
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import './Dashboard.css';

export function TaskCard (course, taskType, year, term, week, completed, progress, setProgress, num) {
  let cardId = `card_${num}`;

  const handleDone = () => {
    let card = document.getElementById(`card${cardId}`);
    let cardHeader = document.getElementById(`card-header${cardId}`);
    card.style.animationDelay="0s";
    cardHeader.style.animationDelay="0s";
    let newProgress = [...progress];
    if (!completed) {
      card.style.animation="0.5s ease-in 0s 1 normal forwards running card-transition-done";
      cardHeader.style.animation="0.5s ease-in 0s 1 normal forwards running card-header-transition-done";
      newProgress[num] = "done";
      completed = true;
    } else {
      card.style.animation="0.5s ease-in 0s 1 normal forwards running card-transition-not-done";
      cardHeader.style.animation="0.5s ease-in 0s 1 normal forwards running card-header-transition-not-done";
      newProgress[num] = "not done";
      completed = false;
    }
    setProgress(newProgress);
  }

  console.log(completed);

  const handleDelete = () => {
    let newProgress = [...progress];
    newProgress[num] = "deleted";
    console.log(newProgress);
    setProgress(newProgress);
  }

  let bgString = "#ffffff";
  let txtString = "#000000";
  if (completed === true) {
    bgString = "rgb(55, 55, 172)";
    txtString = "#ffffff";
  }

  return(
    <Card className='task-card' id={`card${cardId}`} sx={{backgroundColor:bgString}} >
    <CardContent sx={{pb: 0}}>
      <Typography className="task-card-header" id={`card-header${cardId}`} 
      variant="h5" align="center" 
      sx={{fontWeight:"bold", color:txtString}}>
        {course}
      </Typography>
      <Typography className="task-card-text1" sx={{mb:0, mt:0}}>
        {year}T{term} Week {week}<br></br>{taskType}
      </Typography>
    </CardContent>
    <CardActions sx={{pt: 0}}>
    <IconButton className="done-icon" onClick={() => handleDone()} sx={{ml: 1.8}}>
      <DoneOutlineIcon />
    </IconButton>
    <IconButton>
      <ModeEditIcon />
    </IconButton>
    <IconButton onClick={() => handleDelete()}>
      <DeleteIcon />
    </IconButton>
    </CardActions>
    </Card>
  )
}