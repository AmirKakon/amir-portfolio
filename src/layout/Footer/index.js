import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

const FooterContactInformation = ({isSmallScreen}) => {
  return (
    <Grid item>
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" marginRight={2}>
          <WhatsAppIcon color="action" style={{ marginRight: "5px" }} />
          <Typography>
            <Link
              href="https://wa.me/972547321928"
              color="textPrimary"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              {!isSmallScreen && ("+972-54-732-1928")}
            </Link>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <EmailIcon color="action" style={{ marginRight: "5px" }} />
          <Typography>
            <Link
              href="mailto:amir.kakon@gmail.com"
              color="textPrimary"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              {!isSmallScreen && ("amir.kakon@gmail.com")}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

const FooterCopyright = ({version}) => {
  return (
          <Grid item>
            <Box display="flex" alignItems="center">
              <Typography color="textPrimary" fontFamily="serif">
                Version {version}
              </Typography>
            </Box>
          </Grid>
  )
}

const Footer = ({ isSmallScreen }) => {
  const [version, setVersion] = useState("Loading...");

  useEffect(() => {
    // Fetch the content of version.txt
    fetch("/version.txt")
      .then((response) => response.text())
      .then((text) => {
        setVersion(text.trim()); // Update state with fetched version
      })
      .catch(() => {
        setVersion("Error loading version"); // Handle any error during fetching
      });
  }, []);

  return (
    <footer>
      <Box sx={{ bgcolor: "#eeeeee", padding: "20px 0" }}>
        <Grid
          container
          direction={"row"}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          px={2}
        >
          <FooterContactInformation isSmallScreen={isSmallScreen} />

          <FooterCopyright version={version}/>
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;
