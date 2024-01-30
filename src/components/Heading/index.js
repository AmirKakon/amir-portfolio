import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import video from "../../assets/background-video.mp4";
import name from "../../assets/background-name-2.mp4";

const Heading = ({ isSmallScreen }) => {

    const isMediumScreen = useMediaQuery("(max-width: 900px)");

    return (
      !isSmallScreen && (
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: isMediumScreen ? "40vh" : "60vh",
          }}
        >
          <video
            src={name}
            autoPlay
            muted
            style={{ position: "absolute", width: "30vw", left: "2vw", top: "2vh"}}
          />
          <video
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              width: "100vw",
              zIndex: "-1",
            }}
            src={video}
          />
        </Box>
      )
    );
  };

  export default Heading;