import express from "express";
import { CreatProject, GetProject, getProjectById, UpdateProject, DeleteProject  } from "../controllers/ProjectsControllers.js";

const ProjectRoute = express.Router();

ProjectRoute.post("/AddProject", CreatProject);
ProjectRoute.get("/GetProject", GetProject);
ProjectRoute.get('/GetProject/:id', getProjectById);
ProjectRoute.put("/UpdateProject/:id", UpdateProject);
ProjectRoute.delete("/DeleteProject/:id", DeleteProject);

export default ProjectRoute;