import mongoose from "mongoose";

const RessourceSchema = new mongoose.Schema({
    title: {
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
    }
});

const RessourceModel = mongoose.model('ressources', RessourceSchema);
export default RessourceModel; 