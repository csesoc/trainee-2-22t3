import "./App.css";
import Profile from "./components/Profile";
import {
  experimental_sx as sx,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#36393f",
      light: "#60636a",
      dark: "#101319",
    },
    secondary: {
      main: "#5865f2",
      light: "#9291ff",
      dark: "#0039be",
    },
    info: {
      main: "#ffffff",
    }
  },
  typography: {
    allVariants: {
      color: "#ffffff",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#36393f",
          color: "#ffffff",
          "&.Mui-focused": {
            backgroundColor: "#0e0e10",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: sx({
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              borderColor: "#5865f2",
            },
          },
        }),
      },
    },
  },
});

function App() {
  return (
    <div>
      <Profile />
    </div>
  );
}

export default App;
