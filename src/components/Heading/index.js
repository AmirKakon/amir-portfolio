import React from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import video from "../../assets/background-video.mp4";
import name from "../../assets/background-name.mp4";
import squareVideo from "../../assets/background-video-square.mp4";
import squareName from "../../assets/background-name-square.mp4";

import { keyframes } from "@emotion/react";

const jumpAnimation = keyframes`
  0% { transform: translateY(0); }
  20% { transform: translateY(-12px); }
  40% { transform: translateY(0); }
  60% { transform: translateY(-7px); }
  100% { transform: translateY(0); }
`;

const Heading = ({ isSmallScreen, handleArrowClick}) => {
  const isMediumScreen = useMediaQuery("(max-width: 900px)");

  return (
    <>
      {!isSmallScreen && (
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
            style={{
              position: "absolute",
              width: "30vw",
              left: "2vw",
              top: "2vh",
              zIndex: "2",
            }}
          />
          <video
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              width: "100vw",
              zIndex: "1",
            }}
            src={video}
          />
        </Box>
      )}

      {isSmallScreen && (
        <Box
          flex={1}
          display="flex"
          alignContent="center"
          justifyContent="center"
          flexDirection="column"
          sx={{ backgroundColor: "#010101", height: "90vh" }}
        >
          <video autoPlay loop muted src={squareVideo} />
          <video
            autoPlay
            muted
            src={squareName}
            style={{ width: "80vw", paddingLeft: 5 }}
          />
          <IconButton
            color="secondary"
            sx={{ animation: `${jumpAnimation} 1.5s ease-in-out infinite` }}
            onClick={handleArrowClick}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default Heading;
