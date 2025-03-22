import ProjectModel from "../Models/Projects.js";


const CreatProject = async(req, res) => {
    try{
        const project = await ProjectModel.create(req.body);
        await project.save();
        res.status(200).send(project);
        // await project.save();
        console.log("Project added succefully")

    } catch (error) {
     console.error("Failed adding project");
     res.status(400).json({message:"Failed addding project"});
    }
}


const GetProject = async(req, res) => {
    try {
        const project = await ProjectModel.find(req.body);
        res.status(200).send(project)  ;
        console.log("Getting projects succefully");  
          
    } catch (error) {

        console.error("Failed getting project");
        res.status(400).json({messge: "Failed getting project"});
        
    }
}

const UpdateProject = async(req, res) => {
    try {
        const project = await ProjectModel.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true }
        );

        if (!project){
            return res.status(404).json({message:"project not found"});
        }
        res.status(200).send(project);
        console.log("Updating projects succefully");      
    } catch (error) {
        console.error("Failed Updating project");
        res.status(400).json({message: "Failed Updating project"});
        
    }
}

const DeleteProject = async(req, res) => {
    try {
        const ProjectId = req.params.id;

        if (!ProjectId){
            return res.status(404).json({message:"project  ID not found"});
        }

        const project = await ProjectModel.findById(ProjectId);
        
        if (!project){
            return res.status(404).json({message:"project not found"});
        }

        await ProjectModel.findByIdAndDelete(ProjectId);

        
        
        res.status(200).json({message:"Project deleted successfully", project});
        console.log("delleting projects succefully");      
    } catch (error) {
        console.error("Failed Deletting project");
        res.status(400).json({messge: "Failed deletting project"});
        
    }
}


export{CreatProject, GetProject, UpdateProject, DeleteProject};


