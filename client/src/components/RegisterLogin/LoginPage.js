import { FormLabel, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Link, useNavigate } from "react-router-dom";
import './RegisterLogin.css';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validLogin, setValidLogin] = useState(false);
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

    const handleSubmit = (e) => {
        // TODO: Need to create a session token for the user stored in the database
        e.preventDefault();
        setUsername("");
        setPassword("");
        navigate("/");
    }

    return (
        <>
            <div className="register-container">
                <Typography variant="h2" sx={{ mb: 8 }}>Log in to Doom Tracker 💀</Typography>

                <form noValidate className="form-container" onSubmit={handleSubmit}>
                    <StyledFormLabel>Username</StyledFormLabel>
                    <TextField variant='outlined' name="username" onChange={(e) => setUsername(e.target.value)} autoComplete="new-password" sx={{ mb: 3, mt: 1 }} />
                    <StyledFormLabel>Password</StyledFormLabel>
                    <TextField variant='outlined' name="password" onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" sx={{ mb: 3, mt: 1 }} />
                    <Link to="../register" className='redirect-text'> Don't have an account?</Link>
                    <Button variant="contained" type="submit" color="secondary" disabled={!validLogin} sx={{ fontWeight: "bold" }}>Login</Button>
                </form>
            </div>
        </>
    );
}