import React, { useEffect, useState } from "react";
import { Button, Rating, Typography } from "@mui/material";
import BlackSkullsvg from "./BlackSkullsvg";
import WhiteSkullsvg from "./WhiteSkullsvg";
import MrIncredibleUncanny from "./MrIncredibleUncannySkull.webp";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./HowPrepared.css";

const labels = {
  null: "hello",
  0.5: "very slightly doomed",
  1: "Very Slightly Doomed",
  1.5: "Almost Doomed",
  2: "Just Doomed",
  2.5: "Solidly Doomed",
  3: "SOLIDLY DOOMED",
  3.5: "Undeniably Doomed",
  4: "UNDENIABLY DOOMED",
  4.5: "CRAZY Doomed",
  5: "CRAAAAAAAAAAAAAAAAAAAAAAAAAZY DOOMED",
};

function getLabelText(value) {
  return `${value}`;
}

const HowPreparedSelector = ({ userId, runUpdateTasks }) => {
  const [value, setValue] = useState(0);
  const [newValue, setNewValue] = useState(0);
  const [pressedSubmit, setPressedSubmit] = useState(false);
  const [hover, setHover] = useState(-1);
  const [maxDoomShown, setMaxDoomShown] = useState(false);

  // Calculates day of the week (e.g., Monday: 1, Tuesday: 2 etc.)
  const d = new Date();
  let day = d.getDay();

  const putHowPreparedSubmitRequestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rating: value,
      dateSelected: Date.now(),
      daySelected: day,
    }),
    credentials: "include",
  };
  const handleHowPreparedSubmit = () => {
    console.log(putHowPreparedSubmitRequestOptions.body);
    // setPressedSubmit(true);
    setNewValue(value);
    fetch(
      "http://localhost:5000/users/setDoomRating",
      putHowPreparedSubmitRequestOptions
    )
      .then()
      .catch((error) => console.log(error));
  };

  const maxDoomSelector = () => {
    return (
      <div>
        <Rating
          max={1}
          icon={<img src={MrIncredibleUncanny}></img>}
          emptyIcon={<img src={MrIncredibleUncanny}></img>}
          onChange={() => {
            console.log("Hello");
          }}
        />

        <Typography variant="h6">I'm DOOOMED</Typography>
      </div>
    );
  };

  const handleClickDropdownSelector = () => {
    if (maxDoomShown) {
      setMaxDoomShown(false);
    } else {
      setMaxDoomShown(true);
    }
  };

  const [getValue, setGetValue] = useState(0);
  const getDoomRatingOptions = {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    credentials: "include",
  };
  useEffect(() => {
    if (userId !== undefined) {
      fetch(
        `http://localhost:5000/tasks/getOtherDoomRating?userId=${userId}`,
        getDoomRatingOptions
      )
        .then((res) => {
          return res.json();
        })
        .then(() => console.log("HELLLLOOO"))
        .then((data) => console.log(data))
        .then((data) => setGetValue(data.otherDoomRating.rating))
        .then(() => runUpdateTasks())
        .catch((error) => console.log(error));
    } else {
      fetch(`http://localhost:5000/users/getDoomRating`, getDoomRatingOptions)
        .then((res) => {
          return res.json();
        })
        // .then((data) => setValue(data.doomRating.rating))
        // .then(() => {
        //   if (newValue !== value) {
        //     value = newValue;
        //   }
        // })
        .then((data) => setValue(data.doomRating.rating))

        .then((data) => console.log(data.doomRating.rating))
        .then((data) => {
          if (data.value === 0) {
            setValue(0);
          }
        })
        .then((data) => console.log(data.doomRating.rating))
        .then(() => runUpdateTasks())
        .catch((error) => console.log(error));
    }
  }, [userId]);

  return (
    <>
      <div className="how-prepared-rating">
        <div className="how-prepared-selector">
          {userId === undefined ? (
            <Rating
              icon={<WhiteSkullsvg />}
              emptyIcon={<BlackSkullsvg />}
              precision={0.5}
              value={value}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              className="how-prepared-rating-selector"
            />
          ) : (
            <Rating
              icon={<WhiteSkullsvg />}
              emptyIcon={<BlackSkullsvg />}
              precision={0.5}
              value={getValue}
              getLabelText={getLabelText}
              // onChange={(event, newValue) => {
              //   setValue(newValue);
              // }}
              // onChangeActive={(event, newHover) => {
              //   setHover(newHover);
              // }}
              className="how-prepared-rating-selector"
              readOnly
            />
          )}
        </div>

        <Typography className="how-prepared-rating-label">
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Typography>
        {userId === undefined ? (
          <Button variant="contained" onClick={handleHowPreparedSubmit}>
            Submit
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleHowPreparedSubmit}
            disabled
          >
            Submit
          </Button>
        )}

        {/* <IconButton
          className="how-prepared-dropdown-arrow"
          onClick={handleClickDropdownSelector}
        >
          <ArrowDropDownIcon />
        </IconButton> */}
        {maxDoomShown && (
          <div>
            <Rating
              max={1}
              icon={<img src={MrIncredibleUncanny}></img>}
              emptyIcon={<img src={MrIncredibleUncanny}></img>}
            />

            <Typography variant="h6">I'm DOOOMED</Typography>
          </div>
        )}
      </div>
    </>
  );
};

export default HowPreparedSelector;
