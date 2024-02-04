import React, { useState } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from '@mui/icons-material/Info';
import logo from "../../assets/amir-icon.png";
import tongueLogo from "../../assets/amir-tongue-icon.png";

const HeaderLogo = ({ isSmallScreen }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <>
      {!isSmallScreen && (
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            color: "inherit",
            marginLeft: -10,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={isHovered ? tongueLogo : logo} alt="Amir's Portfolio" height={55}/>
        </Link>
      )}

      <Typography
        variant="h5"
        sx={{ flexGrow: 1, textAlign: isSmallScreen ? "center" : "left", ml:isSmallScreen ? -5 : 1}}
      >
        Amir's Portfolio
      </Typography>
    </>
  );
};

const LargeScreenIcon = ({ title, link, icon }) => {
  return (
    <Tooltip title={title}>
      <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
        <IconButton color="inherit">{icon}</IconButton>
      </Link>
    </Tooltip>
  );
};

const SmallScreenIcon = ({ title, link, icon, handleDrawerClose }) => {
  return (
    <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItem button onClick={handleDrawerClose}>
        {icon && <IconButton color="inherit">{icon}</IconButton>}
        <ListItemText primary={title} />
      </ListItem>
    </Link>
  );
};

const Header = ({ isSmallScreen }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const headerIcons = [{ title: "Home", link: "/", icon: <HomeIcon /> },
  { title: "About", link: "/about", icon: <InfoIcon /> }];

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 7 }}>
      <AppBar position="fixed">
        <Toolbar>
          {isSmallScreen && (
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <img
                src={isDrawerOpen ? tongueLogo : logo}
                alt="Amir's Portfolio"
                height={50}
              />
            </IconButton>
          )}

          <HeaderLogo isSmallScreen={isSmallScreen} />

          {!isSmallScreen && (
            <>
              {headerIcons.map((item, index) => (
                <LargeScreenIcon
                  key={index}
                  title={item.title}
                  link={item.link}
                  icon={item.icon}
                />
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>

      {isSmallScreen && (
        <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
          <List>
            {headerIcons.map((item, index) => (
              <SmallScreenIcon
                key={index}
                title={item.title}
                link={item.link}
                icon={item.icon}
                handleDrawerClose={handleDrawerClose}
              />
            ))}
          </List>
        </Drawer>
      )}
    </Box>
  );
};

export default Header;
