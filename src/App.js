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
import { Box } from "@mui/material";
import { HomePage, AboutPage } from "./pages";
import { Header, Footer } from "./layout";

const App = () => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState(
    // createTheme(prefersDarkMode ? darkThemeOptions : lightThemeOptions)
    createTheme(lightThemeOptions)
  );

  useEffect(() => {
    setTheme(
      // createTheme(prefersDarkMode ? darkThemeOptions : lightThemeOptions)
      createTheme(lightThemeOptions)
    );
  }, [prefersDarkMode]);

  useEffect(() => {
    const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
    ReactGA.initialize(`${trackingId}`);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header isSmallScreen={isSmallScreen} />
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
          <Footer isSmallScreen={isSmallScreen} />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
