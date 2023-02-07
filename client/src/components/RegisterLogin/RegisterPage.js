import {
  FormLabel,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./RegisterLogin.css";
import env from "react-dotenv";

export default function RegisterPage() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [errors, setErrors] = useState({});
  const [validRegister, setValidRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();
  // Reminder to customise margin of textfields based on sm, md, lg which are breakpoints for fixed screen width
  // Can clean up styling by using styled function from MUI instead of repeating sx, defining an sxStyle and inserting into sx property

  const StyledFormLabel = styled(FormLabel)({
    fontWeight: "bold",
  });

  useEffect(() => {
    // eslint-disable-next-line
    let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (
      inputs.username.trim().length !== 0 &&
      emailRegex.test(inputs.email) &&
      inputs.password.trim().length !== 0 &&
      inputs.password === inputs.confirmPass
    ) {
      setValidRegister(true);
    } else {
      setValidRegister(false);
    }
  }, [inputs]);

  const handleChange = (e) => {
    let name = e.target.name;
    let data = e.target.value;
    if (name === "username" || name === "email") {
      setErrors({});
    }

    // Need to add [] to name to add object key by variable name
    setInputs((currInput) => ({ ...currInput, [name]: data }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currErrors = {};
    const data = {
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
      tasks: [],
      courses: [],
    };

    const response = await fetch(env.BE_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (response.status === 400) {
      // Username or email already exists in database
      const res_json = await response.json();
      if (res_json.error.toLowerCase().includes("username")) {
        currErrors["username"] = "This username is already taken.";
      } else if (res_json.error.toLowerCase().includes("email")) {
        currErrors["email"] = "This email is already taken.";
      }
      setErrors(currErrors);
      throw new Error(res_json.error);
    } else if (!response.ok) {
      throw new Error(`HTTP Error ${response.status} when registering user.`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="register-container">
        <Typography variant="h2" sx={{ mb: 8 }}>
          Create your Doom Tracker Account 💀
        </Typography>

        <form
          className="form-container"
          autoComplete="off"
          onSubmit={handleSubmit}
          noValidate
        >
          <StyledFormLabel>Username</StyledFormLabel>
          <TextField
            variant="outlined"
            name="username"
            onChange={handleChange}
            autoComplete="off"
            sx={{ mb: 3, mt: 1 }}
            error={"username" in errors}
            helperText={errors.username}
          />
          <StyledFormLabel>Email</StyledFormLabel>
          <TextField
            variant="outlined"
            name="email"
            onChange={handleChange}
            autoComplete="off"
            sx={{ mb: 3, mt: 1 }}
            error={"email" in errors}
            helperText={errors.email}
          />
          <StyledFormLabel>Password</StyledFormLabel>
          <TextField
            variant="outlined"
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="info"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3, mt: 1 }}
          ></TextField>

          <StyledFormLabel>Confirm Password</StyledFormLabel>
          <TextField
            variant="outlined"
            type={showConfirmPass ? "text" : "password"}
            name="confirmPass"
            onChange={handleChange}
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="info"
                    onClick={() => {
                      setShowConfirmPass(!showConfirmPass);
                    }}
                  >
                    {showConfirmPass ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3, mt: 1 }}
          />
          <Link to="../login" className="redirect-text">
            Already have an account?
          </Link>
          <Button
            variant="contained"
            type="submit"
            disabled={!validRegister}
            color="secondary"
            sx={{ fontWeight: "bold" }}
          >
            Sign up
          </Button>
        </form>
      </div>
      {/* Insert skull emoji logo with caption */}
    </>
  );
}
