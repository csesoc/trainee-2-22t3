import { FormLabel, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './RegisterLogin.css';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validLogin, setValidLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (username.trim().length !== 0 && password.trim().length !== 0) {
            setValidLogin(true);
        } else {
            setValidLogin(false);
        }
    }, [username, password])

    const StyledFormLabel = styled(FormLabel)({
        fontWeight: "bold",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "username": username,
            "password": password,
        }
        const currErrors = {};
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 400) {
            const res_json = await response.json();
            console.log(res_json);

            if (res_json.error.toLowerCase().includes("user")) {
                currErrors["username"] = "This username does not exist.";
            }
            else if (res_json.error.toLowerCase().includes("password")) {
                currErrors["password"] = "Incorrect password. Please try again."
            }
            setErrors(currErrors);
        }
        else if (!response.ok) {
            throw new Error(`HTTP Error ${response.status} when logging in user.`)
        }
        else {
            setUsername("");
            setPassword("");
            navigate("/");
        }
    }

    return (
        <>
            <div className="register-container">
                <Typography variant="h2" sx={{ mb: 8 }}>Log in to Doom Tracker 💀</Typography>

                <form className="form-container" autoComplete="off" onSubmit={handleSubmit} noValidate>
                    <StyledFormLabel>Username</StyledFormLabel>
                    <TextField variant='outlined' name="username" onChange={(e) => setUsername(e.target.value)} autoComplete="off" sx={{ mb: 3, mt: 1 }}
                        error={"username" in errors} helperText={errors.username} />
                    <StyledFormLabel>Password</StyledFormLabel>
                    <TextField
                        variant='outlined'
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton color="info" onClick={() => { setShowPassword(!showPassword) }}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>)
                        }}
                        sx={{ mb: 3, mt: 1 }}
                        error={"password" in errors} helperText={errors.password} />
                    <Link to="../register" className='redirect-text'> Don't have an account?</Link>
                    <Button variant="contained" type="submit" color="secondary" disabled={!validLogin} sx={{ fontWeight: "bold" }}>Login</Button>
                </form>
            </div>
        </>
    );
}