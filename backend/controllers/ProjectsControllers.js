import ProjectModel from "../Models/Projects.js";


const CreatProject = async(req, res) => {
    try{
        const project = await ProjectModel.create(req.body);
        res.status(200).send(project);
        console.log("Project added succefully")

    } catch (error) {
     console.error("Failed adding project");
     res.status(400).json({message:"Failed addding project"});
    }
}


const GetProject = async(req, res) => {
    try {
        const project = await ProjectModel.find().populate('tasks').populate('ressources');
        res.status(200).send(project)  ;
        console.log("Getting projects succefully");      
    } catch (error) {
        console.error("Failed getting project");
        res.status(400).json({messge: "Failed getting project"});
        
    }
}

const UpdateProject = async(req, res) => {
    try {
        const ProjectId = req.params.id;
        const project = await ProjectModel.findByIdAndUpdate(ProjectId, req.body);
        res.status(200).send(project);
        console.log("Updating projects succefully");      
    } catch (error) {
        console.error("Failedettin Updating project");
        res.status(400).json({messge: "Failed Updating project"});
        
    }
}

const DeleteProject = async(req, res) => {
    try {
        const ProjectId = req.params.id;
        const project = await ProjectModel.findByIdAndDelete(ProjectId, req.body).populate('tasks').populate('ressources');
        res.status(200).send(project);
        console.log("Updating projects succefully");      
    } catch (error) {
        console.error("Failedettin Updating project");
        res.status(400).json({messge: "Failed Updating project"});
        
    }
}


export{CreatProject, GetProject, UpdateProject, DeleteProject};