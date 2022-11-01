import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

export default function ProfileSearchBar() {
    const [searchInput, setSearchInput] = useState("");
    // Temporary search results for testing
    const [searchResults, setSearchResults] = useState(["andrew", "henry", "eklavya", "ashley", "brian"]);
    // Look at twitch search bar for example on dropdown menu upon search

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Form submitted with input value ${searchInput}`);
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value);
        // Display autocomplete with dropdown menu based on current value of searchInput
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField variant="outlined" autoComplete="off" onChange={handleChange}
                InputProps={{
                    startAdornment:
                        <InputAdornment position="start">
                            <IconButton onClick={handleSubmit} edge="start" color="info">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>

                }} />
        </form>
    )
}