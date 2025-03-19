import RessourceModel from "../Models/Ressource.js";


const CreatRessource = async(req, res) => {
    try{
        const Ressource = await RessourceModel.create(req.body);
        res.status(200).send(Ressource);
        console.log("Ressource added succefully")

    } catch (error) {
     console.error("Failed adding Ressource");
     res.status(400).json({message:"Failed addding Ressource"});
    }
}


const GetRessource = async(req, res) => {
    try {
        const Ressource = await RessourceModel.find();
        res.status(200).send(Ressource)  ;
        console.log("Getting Ressources succefully");      
    } catch (error) {
        console.error("Failed getting Ressources");
        res.status(400).json({messge: "Failed getting Ressources"});
        
    }
}

const UpdateRessource = async(req, res) => {
    try {
        const RessourceId = req.params.id;
        const Ressource = await RessourceModel.findByIdAndUpdate(RessourceId, req.body);
        res.status(200).send(Ressource);
        console.log("Updating Ressource succefully");      
    } catch (error) {
        console.error("Failed Updating Ressource");
        res.status(400).json({messge: "Failed Updating Ressource"});
        
    }
}

const DeleteRessource = async(req, res) => {
    try {
        const RessourceId = req.params.id;
        const Ressource = await RessourceModel.findByIdAndDelete(RessourceId, req.body);
        res.status(200).send(Ressource);
        console.log("Updating Ressource succefully");      
    } catch (error) {
        console.error("Failedettin Updating Ressource");
        res.status(400).json({messge: "Failed Updating Ressource"});
        
    }
}


export{CreatRessource, GetRessource, UpdateRessource, DeleteRessource};