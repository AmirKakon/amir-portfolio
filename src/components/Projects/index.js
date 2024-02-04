import React from "react";
import { Paper, Typography, Grid } from "@mui/material";
import developer from "../../assets/developer.gif";

const Projects = () => {
  return (
    <div id="projects">
      <Paper sx={{ margin: 1, padding: 1 }}>
        <Grid container direction="column" display="flex" alignItems="center">
          <Grid
            container
            item
            direction="row"
            display="flex"
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid item>
              <img src={developer} style={{ width: 31 }} />
            </Grid>
            <Grid item>
              <Typography variant="h4" textAlign="center">
                Projects
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography>
              I am an enthusiastic Software Engineer and Oleh Chadash (New
              Immigrant) with a wide range of professional experience.
              <br />
              Expertise in Object-Oriented programming, algorithms, and data
              structures.
              <br />
              Extensive background in Azure systems, Full Stack programming and
              IoT devices.
              <br />I like to experiment with and learn new technical skills,
              such as website development, photography, and piano playing.
              <br />
              <i>Fluent in Hebrew and English as mother tongue.</i>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Projects;
