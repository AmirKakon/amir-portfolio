import React from "react";
import { Paper, Typography, Grid } from "@mui/material";
import ProjectItem from "./ProjectItem";
import developer from "../../assets/developer.gif";

const Projects = () => {
  const items = [
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/amir-portfolio-9fe8a.appspot.com/o/projects%2Frs485-project.png?alt=media&token=096f3327-416d-4139-867a-5a4f2cc9b2a3",
      alt: "Master / Slave Simulator",
      title: "Master / Slave Simulator",
      languages: "C# .NET / Linux / Azure IoT Central",
      description:
        "Modular Rs485 serial port simulator to support Master-Slave communications between Gateway and Edge devices.",
      url: "master-slave-simulator",
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/amir-portfolio-9fe8a.appspot.com/o/projects%2Frs485-project.png?alt=media&token=096f3327-416d-4139-867a-5a4f2cc9b2a3",
      alt: "Device Management Dashboard",
      title: "Device Management Dashboard",
      languages: "ReactJS / Azure Functions (C#) / KQL",
      description:
        "Manage, monitor and control devices in the field using a web-based dashboard.",
      url: "device-management-dashboard",
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/amir-portfolio-9fe8a.appspot.com/o/projects%2FScreenshot%202024-02-04%20125144.png?alt=media&token=6dc9df64-cf71-477a-b87d-f33498bc79ac",
      alt: "Bayit Abroad",
      title: "Bayit Abroad",
      languages: "ReactJS / Firebase Functions (Node.js) / Firestore Database",
      description: "Equipement rental platform for travelers.",
      url: "bayit-abroad",
    },
  ];

  return (
    <div id="projects">
      <Paper sx={{ margin: 1, padding: 1}}>
        <Grid container direction="column" display="flex" alignItems="center">
          <Grid
            container
            item
            direction="row"
            display="flex"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ marginBottom: 1 }}
          >
            <Grid item>
              <img src={developer} alt="" style={{ width: 31 }} />
            </Grid>
            <Grid item>
              <Typography variant="h4" textAlign="center">
                Projects
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="row"
            display="flex"
            alignItems="stretch"
            justifyContent="center"
            spacing={1}
            sx={{ flexGrow: 1 }}
          >
            {items.map((item, index) => (
              <Grid item xs={12} sm={7} md={4} key={index}>
                <ProjectItem project={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Projects;
