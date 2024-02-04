import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Loading from "../../components/Loading";

const ProjectOverviewPage = ({ isSmallScreen }) => {
  const { projectId } = useParams();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return false ? (
    <Loading />
  ) : (
    <Box
      flex={1}
      spacing={1}
      sx={{ backgroundColor: "#e2e2e2", paddingTop: 1 }}
    >
      <div>
        <h1>{projectId}</h1>
        <p>Description of the project.</p>
        <h2>Features</h2>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
        <h2>Technologies Used</h2>
        <ul>
          <li>Technology 1</li>
          <li>Technology 2</li>
          <li>Technology 3</li>
        </ul>
        <h2>Project Screenshots</h2>
        <img src="screenshot1.png" alt="Screenshot 1" />
        <img src="screenshot2.png" alt="Screenshot 2" />
        <img src="screenshot3.png" alt="Screenshot 3" />
      </div>
    </Box>
  );
};

export default ProjectOverviewPage;
