import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Loading from "../../components/Loading";

const ProjectOverviewPage = ({ isSmallScreen }) => {
  const { projectId } = useParams();

  const project = {
    title: "Master / Slave Simulator",
    description:
      "Designed and implemented a modular serial port simulator to support Master-Slave communications, allowing developers to test middleware and produce real-time data before hardware was available. The Master / Slave model allowed for the simulated devices to run concurrently and independent from each other, allowing for a more realistic simulation of the real-world devices. Using a predefined communication packet, the master can request telemetry and alarm data as well as send commands to change device properties and restart the device.",
    features: [
      "RS485 serial port communication transferring lightweight encrypted serial packets.",
      "Raspberry Pi integration to match Linux based IoT Edge devices.",
      "Modular and configurable data formats that adhere to the Azure Digital Twin Model.",
      "Support for multiple slave devices operating in parallel threads.",
      "Real-time data generation and visualization.",
    ],
    technologies: ["C# .Net", "Raspberry Pi (Linux)", "Azure IoT Central"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/amir-portfolio-9fe8a.appspot.com/o/projects%2Frs485-project.png?alt=media&token=096f3327-416d-4139-867a-5a4f2cc9b2a3",
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return false ? (
    <Loading />
  ) : (
    <Box flex={1} sx={{ backgroundColor: "#e2e2e2", padding: 1 }}>
      <Paper sx={{ padding: 1 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign={isSmallScreen ? "center" : "left"}
          padding={isSmallScreen ? 0 : 1}
        >
          {project.title}
        </Typography>

        <Grid container spacing={2} sx={{ padding: 1 }}>
        {isSmallScreen && (<Grid item xs={12} sm={5}>
            <img
              width="100%"
              src={project.image}
              alt="Master"
            />
          </Grid>)}



          <Grid item sm={7}>
            <Typography variant="body1">{project.description}</Typography>

            <Typography
              variant="body1"
              fontWeight="bold"
              backgroundColor="#d4d4d4"
              paddingLeft={1}
            >
              Features:
            </Typography>
            <List sx={{ marginTop: -1 }}>
              {project.features.map((feature, index) => (
                <ListItem key={index} disablePadding sx={{ paddingLeft: 1 }}>
                  <ListItemText primary={"• " + feature} />
                </ListItem>
              ))}
            </List>

            <Typography
              variant="body1"
              fontWeight="bold"
              backgroundColor="#d4d4d4"
              paddingLeft={1}
            >
              Technologies Used:
            </Typography>
            <List sx={{ marginTop: -1 }}>
              {project.technologies.map((technology, index) => (
                <ListItem key={index} disablePadding sx={{ paddingLeft: 1 }}>
                  <ListItemText primary={"• " + technology} />
                </ListItem>
              ))}
            </List>
            <Typography
              variant="body1"
              fontWeight="bold"
              backgroundColor="#d4d4d4"
              paddingLeft={1}
            >
              Project Screenshots:
            </Typography>
            <img src="screenshot1.png" alt="Screenshot 1" />
            <img src="screenshot2.png" alt="Screenshot 2" />
            <img src="screenshot3.png" alt="Screenshot 3" />
          </Grid>
          {!isSmallScreen && (<Grid item sm={5}>
            <img
              width="100%"
              src={project.image}
              alt="Master"
            />
          </Grid>)}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProjectOverviewPage;
