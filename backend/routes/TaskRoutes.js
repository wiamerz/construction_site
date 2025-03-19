import express from "express";
import { CreatTask, GetTask, UpdateTask, DeleteTask } from "../controllers/TaskControllers.js";

const TaskRoute = express.Router();

TaskRoute.post("/AddTask", CreatTask);
TaskRoute.get("/GetTask", GetTask);
TaskRoute.put("/UpdateTask", UpdateTask);
TaskRoute.delete("/DeleteTask", DeleteTask);

export default TaskRoute;