import { FormLabel, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import './register.css';



export default function RegisterPage() {
    const theme = useTheme();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [validRegister, setValidRegister] = useState(false);



    // Use twitch registration as an example, white bold for labels and white regular for text, primary light for textfield background
    // primary dark for selecting/focus in textfield background, secondary for accents e.g. submit button background
    // Reminder to customise margin of textfields based on sm, md, lg which are breakpoints for fixed screen width
    // Can clean up styling by using styled function from MUI instead of repeating sx, defining an sxStyle and inserting into sx property

    // TODO: Make useStates into a dictionary with each inputfield being a key e.g. username, disable autocomplete for email
    const StyledFormLabel = styled(FormLabel)({
        fontWeight: "bold",
    })

    useEffect(() => {
        console.log("Detected change to input field values")
        let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (username.trim().length !== 0 && emailRegex.test(email) && password.trim().length !== 0 && password === confirmPass) {
            setValidRegister(true);
        }


    }, [username, email, password, confirmPass])
    console.log(username)
    console.log(email)
    console.log(password)

    const handleSubmit = () => {

    }

    return (
        <>
            <div className="register-container">
                <Typography
                    variant="h2"
                    sx={{ mb: 8 }}
                >
                    Create your Doom Tracker Account 💀
                </Typography>

                <form noValidate className="form-container" onSubmit={handleSubmit}>
                    <StyledFormLabel>Username</StyledFormLabel>
                    <TextField variant='outlined' onChange={(e) => setUsername(e.target.value)} autoComplete="new-password" sx={{ mb: 3, mt: 1 }} />
                    <StyledFormLabel>Email</StyledFormLabel>
                    <TextField variant='outlined' onChange={(e) => setEmail(e.target.value)} autoComplete="new-password" sx={{ mb: 3, mt: 1 }} />
                    <StyledFormLabel>Password</StyledFormLabel>
                    <TextField variant='outlined' onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" sx={{ mb: 3, mt: 1 }} />
                    <StyledFormLabel>Confirm Password</StyledFormLabel>
                    <TextField variant='outlined' onChange={(e) => setConfirmPass(e.target.value)}
                        autoComplete="new-password" sx={{ mb: 3, mt: 1 }} />
                    <Button variant="contained" type="submit" disabled={!validRegister} color="secondary" sx={{ fontWeight: "bold" }}>Sign up</Button>
                </form>

            </div>
            {/* Insert skull emoji logo with caption */}
            <Typography variant="h3">~ The number #1 way to assess your university performance ~</Typography>
            <Typography variant="h4">Reminds me of my impending doom... 10/10</Typography>
            <Typography variant="h4">I give this my seal of approval - James Ji</Typography>
        </>
    );
}