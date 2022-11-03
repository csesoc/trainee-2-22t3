import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./components/main/MainPage";
import RegisterPage from "./components/RegisterLogin/RegisterPage";
import LoginPage from "./components/RegisterLogin/LoginPage";
import { experimental_sx as sx, ThemeProvider, createTheme } from "@mui/material/styles";
import LandingPage from "./components/LandingPage/LandingPage";


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
    }
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
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: sx({
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              borderColor: "#5865f2",
            }
          }
        })
      }
    },
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/landing" element={<LandingPage />} />          
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
