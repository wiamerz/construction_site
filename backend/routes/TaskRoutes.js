import express from "express";
import { CreatTask, GetTask, getTasksByProject, UpdateTask, DeleteTask } from "../controllers/TaskControllers.js";

const TaskRoute = express.Router();

TaskRoute.post("/AddTask", CreatTask);
TaskRoute.get("/GetTask", GetTask);
TaskRoute.get('/GetTasksByProject/:projectId', getTasksByProject);
TaskRoute.put("/UpdateTask/:id", UpdateTask);
TaskRoute.delete("/DeleteTask/:id", DeleteTask);

export default TaskRoute;