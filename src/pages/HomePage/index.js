import React, { useEffect, useState, Suspense, lazy } from "react";
import Loading from "../../components/Loading";
import { Box } from "@mui/material";
import { dummyData } from "../../components/Timeline/dummyData";
const Timeline = lazy(() => import("../../components/Timeline"));

const HomePage = ({ isSmallScreen }) => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await fetch("https://api.spacexdata.com/v4/launches");
      // const data = await response.json();
      setTimelineData(dummyData);
      setLoading(false);
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Box flex={1} padding={1}>
      <Suspense fallback={<Loading />}>
        <Timeline isSmallScreen={isSmallScreen} data={timelineData} />
      </Suspense>
    </Box>
  );
};

export default HomePage;
