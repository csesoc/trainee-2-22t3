import { Typography, TextField, Card, CardActions, CardContent, Box, Slider, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { LocalizationProvider, CalendarPicker, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import './Dashboard.css';


export default function Dashboard() {

  const [pickedDate, setPickedDate] = useState(dayjs('2022-04-07'));

  const [dataTasks, setDataTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks/get")
      .then((res) => {
        return res.json();
      })
      .then((dataTasks) => {
        setDataTasks(dataTasks);
      });
  }, [pickedDate]);

  console.log(dataTasks);

  const TaskCardList = (taskType) => {
    let returnObj = [];
    for (let task of dataTasks) {
      if (task.taskType === taskType) {
        let taskInfo = TaskCard(task.course, task.taskType, task.year, task.term, task.week, task.completed);
        console.log(taskInfo);
        returnObj.push(taskInfo);
      }
    }
    console.log(returnObj);
    return returnObj;
  }

  const TaskCard = (course, taskType, year, term, week, completed) => {
    let progress = 0;

    const generateCardColor = () => {
      const r = 255 - (205 * progress * 0.01);
      const g = 255 - (205 * progress * 0.01);
      const b = 255 - (83 * progress * 0.01);
      console.log(`rgba(${r}, ${g}, ${b}, 1)`);
      return `rgba(${r}, ${g}, ${b}, 1)`;
    }

    const handleSliderChange = (event) => {
      progress = event;
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

  const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
      prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
  })(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    ...(dayIsBetween && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isFirstDay && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    }),
    ...(isLastDay && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
  }));

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!pickedDate) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = pickedDate.startOf('week');
    const end = pickedDate.endOf('week');

    const dayIsBetween = date.isBetween(start, end, null, '[]');
    const isFirstDay = date.isSame(start, 'day');
    const isLastDay = date.isSame(end, 'day');

    console.log(start, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <>
      <div className='dashboard-container'>
        <Typography variant="h2" align='center' sx={{fontWeight:"bold"}}>💀 DASHBOARD 💀</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CalendarPicker 
          date={pickedDate} onChange={(pickedDate) => setPickedDate(pickedDate)}
          renderDay={renderWeekPickerDay}
          showDaysOutsideCurrentMonth
          views={["day", "month"]}
           />
        </LocalizationProvider>
        <Divider className='divider'>LECTURES</Divider>
        <div className="divider-container">
        {TaskCardList("lecture")}
        </div>
        <Divider className='divider'>TUTORIALS</Divider>
        <div className="divider-container">
        {TaskCardList("tutorial")}
        </div>
        <Divider className='divider'>HOMEWORK</Divider>
        <div className="divider-container">
        {TaskCardList("homework")}
        </div>
      </div>
    </>
  )
}