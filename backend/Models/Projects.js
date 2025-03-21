import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: [true, "project name required"]
    },
    Description: {
        type: String,
        require: [true, "project description required"]
    },
    Startdate: {
        type: Date,
        require: [true, "Start date required"]
    },
    Enddate: {
        type: Date,
        require: [true, "End date required"]
    },
    Budget: {
        type: Number,
        require: [true, "project budget required"]
    }
});

const ProjectModel = mongoose.model('project', ProjectSchema);
export default ProjectModel; 