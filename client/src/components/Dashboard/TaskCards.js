import { Typography, Card, CardActions, CardContent } from '@mui/material';
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import './Dashboard.css';

export function TaskCard (course, taskType, year, term, week, completed, progress, setProgress, num) {
  let cardId = `card_${num}`;

  const handleDone = () => {
    if (completed) {return}
    let card = document.getElementById(cardId);
    card.style.animationDelay="0s";
    card.style.animation="0.5s ease-in 0s 1 normal forwards running card-transition";
    let newProgress = [...progress];
    newProgress[num] = "done";
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
  if (completed === true) {
    bgString = "rgb(55, 55, 172)";
  }

  return(
    <Card className='task-card' id={cardId} sx={{backgroundColor:bgString}} >
    <CardContent sx={{pb: 0}}>
      <Typography className="task-card-header" variant="h5" align="center" sx={{fontWeight:"bold"}}>
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