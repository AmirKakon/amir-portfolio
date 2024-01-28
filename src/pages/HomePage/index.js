import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import { Box } from "@mui/material";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  window.scrollTo({ top: 0, behavior: "auto" });

  useEffect(() => {
    setLoading(false);
  }, []);


  return (
    loading ? <Loading /> :
    <Box flex={1} padding={1}>
      <h1>Home Page</h1>
    </Box>
  );
};

export default HomePage;
