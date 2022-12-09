import { Typography, Button, Divider } from "@mui/material";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import "../DoomBuddies/ProfileSearchBar";
import ProfileSearchBar from "../DoomBuddies/ProfileSearchBar";

export default function LandingPage() {
  return (
    <>
      <ProfileSearchBar></ProfileSearchBar>
      <div class="landing-container">
        <img
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/microsoft/310/skull_1f480.png"
          alt="skull"
          class="landing-skull"
        ></img>
        <Typography
          variant="h2"
          class="landing-title"
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          DOOM TRACKER
        </Typography>
        <Link to="/login">
          <Button
            variant="outlined"
            type="submit"
            class="landing-button-1"
            sx={{ fontWeight: "normal" }}
          >
            Login
          </Button>
        </Link>
        <Divider
          variant="middle"
          style={{ width: '100%' }}
          class="login-divider"
        />
        <Typography
          variant="h2"
          class="landing-text"
        >
          Don't have an account?
        </Typography>
        <Link to="/register">
          <Button
            href="#text-buttons"
            class="landing-button-2"
            sx={{ fontWeight: "normal" }}
            style={{ textTransform: 'none' }}
          >
            Sign up for Doom Tracker
          </Button>
        </Link>
      </div>
    </>
  )
}
