import { FormLabel, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './RegisterLogin.css';



export default function RegisterPage() {
    const [inputs, setInputs] = useState({
        "username": "",
        "email": "",
        "password": "",
        "confirmPass": "",
    })
    const [validRegister, setValidRegister] = useState(false);


    // Use twitch registration as an example, white bold for labels and white regular for text, primary light for textfield background
    // primary dark for selecting/focus in textfield background, secondary for accents e.g. submit button background
    // Reminder to customise margin of textfields based on sm, md, lg which are breakpoints for fixed screen width
    // Can clean up styling by using styled function from MUI instead of repeating sx, defining an sxStyle and inserting into sx property

    const StyledFormLabel = styled(FormLabel)({
        fontWeight: "bold",
    })

    useEffect(() => {
        let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (inputs.username.trim().length !== 0 && emailRegex.test(inputs.email) && inputs.password.trim().length !== 0 &&
            inputs.password === inputs.confirmPass) {
            setValidRegister(true);
        } else {
            setValidRegister(false);
        }
    }, [inputs])

    const handleChange = (e) => {
        let name = e.target.name;
        let data = e.target.value;
        // Need to add [] to name to add object key by variable name
        setInputs((currInput) => ({ ...currInput, [name]: data }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data =
        {
            "username": inputs.username,
            "password": inputs.password,
            "email": inputs.email,
            "tasks": [],
            "courses": [],
        }

        const response = await fetch("http://localhost:3000/register", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (response.status !== 200) {
            throw new Error(`HTTP Error ${response.status} when registering user.`)
        }
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
                    <TextField variant='outlined' name="username" onChange={handleChange} autoComplete="new-password" sx={{ mb: 3, mt: 1 }} />
                    <StyledFormLabel>Email</StyledFormLabel>
                    <TextField variant='outlined' name="email" onChange={handleChange} autoComplete="new-password" sx={{ mb: 3, mt: 1 }} />
                    <StyledFormLabel>Password</StyledFormLabel>
                    <TextField variant='outlined' name="password" onChange={handleChange} autoComplete="new-password" sx={{ mb: 3, mt: 1 }} />
                    <StyledFormLabel>Confirm Password</StyledFormLabel>
                    <TextField variant='outlined' name="confirmPass" onChange={handleChange}
                        autoComplete="new-password" sx={{ mb: 3, mt: 1 }} />
                    <Link to="../login" className='redirect-text'>Already have an account?</Link>
                    <Button variant="contained" type="submit" disabled={!validRegister} color="secondary" sx={{ fontWeight: "bold" }}>Sign up</Button>
                </form>

            </div>
            {/* Insert skull emoji logo with caption */}
        </>
    );
}