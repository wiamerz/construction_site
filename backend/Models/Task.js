import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Task name required"]
    },
    Description: {
        type: String,
        required: [true, "Task description required"]
    },
    StartDate: { 
        type: Date,
        required: [true, "Start date required"]
    },
    EndDate: {
        type: Date,
        required: [true, "End date required"]
    },
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'project', 
        required: true 
    },
});

const TaskModel = mongoose.model('Task', TaskSchema);
export default TaskModel;
