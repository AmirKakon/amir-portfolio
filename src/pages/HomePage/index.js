import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import { Box, Typography } from "@mui/material";

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

  return loading ? (
    <Loading />
  ) : (
    <Box flex={1} spacing={1}>
      <Heading isSmallScreen={isSmallScreen} />
      <Typography component="h1">Test this out</Typography>
    </Box>
  );
};

export default HomePage;
