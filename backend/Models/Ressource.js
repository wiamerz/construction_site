import mongoose from "mongoose";

const RessourceSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: [true, "Ressource name required"]
    },
    Description: {
        type: String,
        require: [true, "Ressource description required"]
    },
    quantite: {
        type: Number,
        require: [true, "Ressource date required"]
    },
    taskID: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
        required: true
    }
});

const RessourceModel = mongoose.model('ressources', RessourceSchema);
export default RessourceModel; 