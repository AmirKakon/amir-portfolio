import React from "react";

const ProjectItem = ({ project }) => {
  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
    </div>
  );
}