import logo from './logo.svg';
import './App.css';
import { lightThemeOptions, darkThemeOptions } from './theme';
import { ThemeProvider, useMediaQuery, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, AboutPage } from './pages';
import { Header } from './layout';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(
    createTheme(prefersDarkMode ? darkThemeOptions : lightThemeOptions)
  );

  useEffect(() => {
    setTheme(createTheme(prefersDarkMode ? darkThemeOptions : lightThemeOptions));
  }, [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;