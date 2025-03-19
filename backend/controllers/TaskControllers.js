import TaskModel from "../Models/Task.js";


const CreatTask = async(req, res) => {
    try{
        const task = await TaskModel.create(req.body);
        res.status(200).send(task);
        console.log("Task added succefully")

    } catch (error) {
     console.error("Failed adding task");
     res.status(400).json({message:"Failed addding task"});
    }
}


const GetTask = async(req, res) => {
    try {
        const task = await TaskModel.find().populate('ressources');
        res.status(200).send(task)  ;
        console.log("Getting tasks succefully");      
    } catch (error) {
        console.error("Failed getting tasks");
        res.status(400).json({messge: "Failed getting tasks"});
        
    }
}

const UpdateTask = async(req, res) => {
    try {
        const TaskId = req.params.id;
        const task = await TaskModel.findByIdAndUpdate(TaskId, req.body);
        res.status(200).send(task);
        console.log("Updating task succefully");      
    } catch (error) {
        console.error("Failed Updating task");
        res.status(400).json({messge: "Failed Updating task"});
        
    }
}

const DeleteTask = async(req, res) => {
    try {
        const TaskId = req.params.id;
        const task = await TaskModel.findByIdAndDelete(TaskId, req.body).populate('ressources');
        res.status(200).send(task);
        console.log("Updating task succefully");      
    } catch (error) {
        console.error("Failedettin Updating task");
        res.status(400).json({messge: "Failed Updating task"});
        
    }
}


export{CreatTask, GetTask, UpdateTask, DeleteTask};