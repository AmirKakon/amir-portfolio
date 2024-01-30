import React, { useEffect, useState } from "react";
import { Typography, Box, Divider, Grid, CardMedia } from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import hotspot from "../../assets/hotspot.gif";

const Timeline = ({ data, isSmallScreen }) => {
  const [iconSize, setIconSize] = useState(0);

  useEffect(() => {
    if (isSmallScreen) {
      setIconSize(70);
    } else {
      setIconSize(150);
    }
  }, [isSmallScreen]);

  const VerticalLineWithDot = () => {
    return (
      <Box position="relative" display="flex" alignItems="center" justifyContent="center" style={{ height: '100%' }}>
        <Divider orientation="vertical" sx={{ bgcolor: "#a1a1a1", height: "100%", width: "2px" }} />
        <Brightness1Icon sx={{ color: "#2c3c30", position: "absolute" }} />
      </Box>
    );
  };

  const renderTimeline = data.map((event) => (
    <React.Fragment key={event.id}>
      <Grid item xs={5}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ height: "100%" }}
        >
          <CardMedia
            component="img"
            sx={{ height: iconSize, width: iconSize }}
            image={hotspot}
            alt="Event gif"
          />
        </Box>
      </Grid>
      <Grid item xs={2}>
        <VerticalLineWithDot />
      </Grid>

      <Grid item xs={5}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5">{event.title}</Typography>
          <Typography variant="subtitle1">{event.description}</Typography>
          <Typography variant="body1">{event.date}</Typography>
        </Box>
      </Grid>
    </React.Fragment>
  ));

  const renderCurrent = [{size: 6}, {size: 8}, {size: 10}].map((event) => (
    <React.Fragment key={event.size}> 
    <Grid item xs={5}></Grid>
      <Grid item xs={2}>
        {" "}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ height: "100%" }}
        >
          <Brightness1Icon sx={{ color: "#a1a1a1", fontSize: event.size }} />
        </Box>
      </Grid>
      <Grid item xs={5}></Grid>
      </React.Fragment>
  ));

  return (
    <Grid container>
      {renderCurrent}
      {renderTimeline}
    </Grid>
  );
};

export default Timeline;
