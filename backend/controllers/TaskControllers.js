import TaskModel from "../Models/Task.js";


const createTaskByProject = async (req, res) => {
    try {
        const { Name, Description, StartDate, EndDate, projectId } = req.body;

        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        const task = new TaskModel({ Name, Description, StartDate, EndDate, projectId });
        await task.save();

        res.status(201).json(task);
        console.log("Task added successfully to project:", projectId);
    } catch (error) {
        console.error("Failed adding task:", error);
        res.status(500).json({ message: "Failed adding task", error });
    }
};


const getTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find().populate("projectId", "Name");
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Failed fetching tasks:", error);
        res.status(500).json({ message: "Failed fetching tasks", error });
    }
};


const getTasksByProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;

        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        const tasks = await TaskModel.find({ projectId }).populate("projectId", "Name");

        if (tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for this project" });
        }

        res.status(200).json(tasks);
        console.log(`Found ${tasks.length} tasks for project ${projectId}`);
    } catch (error) {
        console.error("Failed fetching tasks for project:", error);
        res.status(500).json({ message: "Failed fetching tasks for project", error });
    }
};


const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findByIdAndUpdate(taskId, req.body, { new: true });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
        console.log("Updated task successfully");
    } catch (error) {
        console.error("Failed updating task:", error);
        res.status(500).json({ message: "Failed updating task", error });
    }
};


const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
        console.log("Deleted task successfully");
    } catch (error) {
        console.error("Failed deleting task:", error);
        res.status(500).json({ message: "Failed deleting task", error });
    }
};

export { createTaskByProject, getTasks, getTasksByProject, updateTask, deleteTask };
