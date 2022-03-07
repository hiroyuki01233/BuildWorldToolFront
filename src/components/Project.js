import React from 'react';
import { Outlet } from "react-router-dom";

const Project = () => {
  return (
      <div>
        <h1>
            Project
        </h1>
        <Outlet />
      </div>
  );
}

export default Project;