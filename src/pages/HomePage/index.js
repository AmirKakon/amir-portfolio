import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Heading from "../../components/Heading";
import AboutMe from "../../components/AboutMe";
import Loading from "../../components/Loading";


const HomePage = ({ isSmallScreen }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await fetch("https://api.spacexdata.com/v4/launches");
      // const data = await response.json();
      setLoading(false);
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const jumpToAboutMe = () => {
    const aboutMe = document.getElementById("about-me");
    aboutMe.scrollIntoView({ behavior: "smooth" });
  };

  return loading ? (
    <Loading />
  ) : (
    <Box flex={1} spacing={1} sx={{backgroundColor: "#e2e2e2"}}>
      <Heading isSmallScreen={isSmallScreen} handleArrowClick={jumpToAboutMe}/>
      <AboutMe isSmallScreen={isSmallScreen} />
    </Box>
  );
};

export default HomePage;
