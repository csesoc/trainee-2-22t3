import { TextField, InputAdornment, IconButton, Menu, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

export default function ProfileSearchBar() {
    const [searchInput, setSearchInput] = useState("");
    // Temporary search results for testing
    const [searchResults, setSearchResults] = useState([
        { "id": 1, "username": "andrew" },
        { "id": 2, "username": "henry" },
        { "id": 3, "username": "eklavya" },
        { "id": 4, "username": "ashley" },
        { "id": 5, "username": "brian" },]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Form submitted with input value ${searchInput}`);
        // If form is submitted should show page with list of profiles with closest matching usernames with search result
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchInput(e.target.value);
        if (e.target.value === "") {
            setAnchorEl(null);
        }
        else {
            setAnchorEl(e.currentTarget);
            // for (const user of searchResults) {
            //     
            //     if (user.username.includes(e.target.value)) {
            //         setFilteredResults([...filteredResults, user.username]);
            //     }
            // }
            setFilteredResults(searchResults.filter((user) => { return user.username.includes(e.target.value) }))
        }

        // Display autocomplete with dropdown menu based on current value of searchInput
        // Menu with .map() of menu items which have been filtered based on searchInput (might have to use e.target.value)
        // Later filter from /users/get request of all users but for now filter based on searchResults local state variable

        // If MenuItem is selected, then it should navigate to page "http://localhost:3000/users/$username" i.e. that user's profile page
        // Where $username refers to the username of the person clicked on, 
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

                }}
            />
            <Menu open={searchInput ? true : false} anchorEl={anchorEl}>
                {/* Menu item is a popover/modal so it won't let you click anywhere else besides options
                Changing background colour changes colour of entire window */}
                {filteredResults.map((user) => <MenuItem key={user.id} >{user.username}</MenuItem>)}
            </Menu>
            <p>{console.log(filteredResults)}</p>
        </form>
    )
}