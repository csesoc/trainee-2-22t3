import { LocalizationProvider, CalendarPicker, PickersDay } from "@mui/x-date-pickers";
import { styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";
import { calculateTaskDate } from "./Helpers";
import './Dashboard.css';

export function WeeklyCalendar(setStartDate, setEndDate) {
  const [pickedDate, setPickedDate] = useState(dayjs(new Date()));

  const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
      prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
  })(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    ...(dayIsBetween && {
      borderRadius: 0,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.secondary.main,
      },
    }),
    ...(isFirstDay && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    }),
    ...(isLastDay && {
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
  }));

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!pickedDate) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = pickedDate.startOf("week");
    const end = pickedDate.endOf("week");

    const dayIsBetween = date.isBetween(start, end, null, "[]");
    const isFirstDay = date.isSame(start, "day");
    const isLastDay = date.isSame(end, "day");

    setStartDate(dayjs(start).format("DD/MM/YYYY"));
    setEndDate(dayjs(end).format("DD/MM/YYYY"));

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

  return (<LocalizationProvider dateAdapter={AdapterDayjs}>
    <CalendarPicker 
    date={pickedDate} onChange={(pickedDate) => setPickedDate(pickedDate)}
    renderDay={renderWeekPickerDay}
    showDaysOutsideCurrentMonth
    views={["day", "month"]}
     />
  </LocalizationProvider>
  )
}