import express from "express";
import { createTaskByProject, getTasks, getTasksByProject, updateTask, deleteTask } from "../controllers/TaskControllers.js";

const TaskRoute = express.Router();

TaskRoute.post("/AddTask", createTaskByProject); 
TaskRoute.get("/GetTasks", getTasks);
TaskRoute.get("/GetTasksByProject/:projectId", getTasksByProject);
TaskRoute.put("/UpdateTask/:id", updateTask);
TaskRoute.delete("/DeleteTask/:id", deleteTask);

export default TaskRoute;
