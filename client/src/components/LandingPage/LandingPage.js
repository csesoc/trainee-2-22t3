import { Typography, Button, Divider } from "@mui/material";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <div class="landing-container">
        <h4 class="landing-skull">💀</h4>
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
            className="landing-button-1"
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
            className="landing-button-2"
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
