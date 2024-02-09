import React, { useEffect, useState } from "react";
import "./App.css";
import ReactGA from "react-ga4";
import { lightThemeOptions, darkThemeOptions } from "./theme";
import { ThemeProvider, useMediaQuery, createTheme } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box, Snackbar } from "@mui/material";
import {
  HomePage,
  ProjectsPage,
  ProjectOverviewPage,
  AboutPage,
} from "./pages";
import { Header, Footer } from "./layout";
import { loginUser, tryGetTokenOrLogin, getUuid } from "./utilities/auth";

const App = () => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState(
    // createTheme(prefersDarkMode ? darkThemeOptions : lightThemeOptions)
    createTheme(lightThemeOptions)
  );
  const [accessToken, setAccessToken] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTheme(
      // createTheme(prefersDarkMode ? darkThemeOptions : lightThemeOptions)
      createTheme(lightThemeOptions)
    );
  }, [prefersDarkMode]);

  useEffect(() => {
    const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
    ReactGA.initialize(`${trackingId}`);

    const id = getUuid();

    const intervalId = setInterval(() => {
      const defaultUser = {
        username: process.env.REACT_APP_DEFAULT_USER_NAME,
        id: id,
      };
      console.log(defaultUser);
      tryGetTokenOrLogin(defaultUser)
        .then((res) => {
          setAccessToken(localStorage.getItem("accessToken"));
        })
        .catch((err) => {
          console.error("tryGetTokenOrLogin failed:", err);
          loginUser(defaultUser)
            .then((res) => {
              setAccessToken(localStorage.getItem("accessToken"));
            })
            .catch((err) => {
              console.error("login failed:", err);
            });
        });
    }, 60 * 1000); // Update every minute

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (accessToken) {
      setMessage("Access token updated");
    }
  }, [accessToken]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header isSmallScreen={isSmallScreen} />
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Routes>
            <Route
              path="/about"
              element={<AboutPage isSmallScreen={isSmallScreen} />}
            />
            <Route
              path="/projects/:projectId"
              element={<ProjectOverviewPage isSmallScreen={isSmallScreen} />}
            />
            <Route
              path="/projects/"
              element={<ProjectsPage isSmallScreen={isSmallScreen} />}
            />
            <Route
              path="/"
              element={<HomePage isSmallScreen={isSmallScreen} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer isSmallScreen={isSmallScreen} />
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={message !== ""}
            onClose={() => {
              setMessage("");
            }}
            message={message}
            key={"jwt-snackbar"}
            autoHideDuration={6000}
          />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
