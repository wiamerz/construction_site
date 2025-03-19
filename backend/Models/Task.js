import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: [true, "project name required"]
    },
    Description: {
        type: String,
        require: [true, "project description required"]
    },
    StartDate: { // Correction de la faute de frappe : StarteDate -> StartDate
        type: Date,
        require: [true, "Start date required"]
    },
    EndDate: {
        type: Date,
        require: [true, "End date required"]
    }
});

const TaskModel = mongoose.model('task', TaskSchema);
export default TaskModel; 