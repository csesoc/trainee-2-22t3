import { Typography, TextField } from '@mui/material';
import { useState } from 'react';
import './register.css'



export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    // Use twitch registration as an example, white bold for labels and white regular for text, primary light for textfield background
    // primary dark for selecting/focus in textfield background, secondary for accents e.g. submit button background
    // Reminder to customise margin of textfields based on sm, md, lg which are breakpoints for fixed screen width

    return (
        <>
            <div className="register-container">
                <Typography
                    variant="h2"
                >
                    Create your Doom Tracker Account 💀
                </Typography>

                <form noValidate className="form-container">
                    <TextField
                        variant='outlined'
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="new-password"
                        sx={{ my: 3 }}
                    />
                    <TextField label="Email" variant='outlined' onChange={(e) => setEmail(e.target.value)} autoComplete="new-password" sx={{ my: 3 }} />
                    <TextField label="Password" variant='outlined' onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" sx={{ my: 3 }} />
                    <TextField label="Confirm password" variant='outlined' onChange={(e) => setConfirmPass(e.target.value)}
                        autoComplete="new-password" sx={{ my: 3 }} />
                </form>

            </div>
            {/* Insert skull emoji logo with caption */}
            <Typography variant="h3">The number #1 way to assess your university performance</Typography>
        </>
    );
}