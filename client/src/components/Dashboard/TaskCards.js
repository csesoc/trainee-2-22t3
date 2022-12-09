import { Typography, Card, CardActions, CardContent } from '@mui/material';
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import dayjs from 'dayjs';
import './Dashboard.css';

export function TaskCard (name, course, date, duration, completed, progress, setProgress, num, taskChanged, setTaskChanged) {
  let cardId = `card_${num}`;

  const day = dayjs(date).format("ddd");
  const startTime = dayjs(date).format("hh:mm");
  let endDate = (new Date(date).setHours(new Date(date).getHours() + duration / 3600));
  const endTime = dayjs(endDate).format("hh:mmA");

  let courseStr = <Typography className="task-card-text1" sx={{mb:0, mt:0}}>{course}<br></br></Typography>;
  if (num % 2 != 0) {
    courseStr = <Typography className="task-card-text1-alt" sx={{mb:0, mt:0}}>{course}<br></br></Typography>;
  }

  let dateStr = <Typography className="task-card-day-text">{day} {startTime}-{endTime}</Typography>;
  if (day === "Tue" || day === "Thu" || day === "Sat") {
    dateStr = <Typography className="task-card-day-text-alt">{day} {startTime}-{endTime}</Typography>;
  }

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
    setTaskChanged(taskChanged + 1);
    setProgress(newProgress);
  }

  const handleDelete = () => {
    let newProgress = [...progress];
    newProgress[num] = "deleted";
    setTaskChanged(taskChanged + 1);
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
        {name}
      </Typography>
      {courseStr}
      {dateStr}
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