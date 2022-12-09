import { TextField, InputAdornment, IconButton, MenuItem, Popper, ListItemIcon, ListItemText, ClickAwayListener } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileSearchBar({ currentFriends = false, notFriends = false }) {
    // By default, displays all users in the database
    // Can specify filter for search results based on props

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPopper, setOpenPopper] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch("http://localhost:5000/users/getUsers", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
                credentials: "include",
            });
            const users = await response.json();
            setSearchResults(users);
        }
        getUsers();
    }, []);

    const getFriends = async () => {
        const response = await fetch("http://localhost:5000/users/friends/get", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
        })
        const friendsList = await response.json();
        return friendsList;
    }


    const openUserTracker = (user) => {
        // Open the page with the user's id
        console.log(user);
        navigate(`/tracker/${user._id}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Form submitted with input value ${searchInput}`);
        // If form is submitted should show page with list of profiles with closest matching usernames with search result
        // Clicking search icon should do the same
    }

    const handleChange = async (e) => {
        // Filters search results based on how closely it matches with user input, 
        // And whether currentFriends or notFriends flags are true, maximum of 8 results shown
        setSearchInput(e.target.value);

        const friendResults = await getFriends();

        if (e.target.value !== "") {
            const friendUsernames = friendResults.map((friendObj) => friendObj.username)

            if (currentFriends) {
                setFilteredResults(searchResults.filter((user) => friendUsernames.includes(user.username)
                    && user.username.startsWith(e.target.value)).slice(0, 8))
            }
            else if (notFriends) {
                setFilteredResults(searchResults.filter((user) => !(friendUsernames.includes(user.username))
                    && user.username.startsWith(e.target.value)).slice(0, 8))
            }
            else {
                setFilteredResults(searchResults.filter((user) => user.username.startsWith(e.target.value)).slice(0, 8))
            }

        } else {
            setFilteredResults([])
        }

        // If MenuItem is selected, then it should navigate to page "http://localhost:3000/tracker/$id" i.e. that user's profile page
        // Where $id refers to the id of the person clicked on, 
    }

    return (
        <ClickAwayListener onClickAway={() => {
            setOpenPopper(false)
            setAnchorEl(null)
        }}>
            <form onSubmit={handleSubmit}>
                <TextField variant="outlined" autoComplete="off" onChange={handleChange} onClick={(e) => {
                    setAnchorEl(e.currentTarget)
                    setOpenPopper(true)
                }}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">
                                <IconButton onClick={handleSubmit} edge="start" color="info">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>

                    }}
                />
                <Popper open={openPopper} anchorEl={anchorEl} placement="bottom-start">
                    {filteredResults.map((user) => {
                        return (
                            <MenuItem key={user._id} onClick={() => openUserTracker(user)} >
                                {/* Default shows person icon but later will show profile image if available */}
                                <ListItemIcon>
                                    <PersonIcon color="info"></PersonIcon>
                                </ListItemIcon>
                                <ListItemText>{user.username}</ListItemText>
                            </MenuItem>
                        )
                    })}
                </Popper>
            </form>
        </ClickAwayListener>
    )
}