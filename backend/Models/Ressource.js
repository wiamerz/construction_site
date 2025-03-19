import mongoose from "mongoose";

const RessourceSchema = new mongoose.Schema({
    title:{
        type: String,
        required : [true, "Ressource name required"]
       },
       Description:{
           type: String,
           required : [true, "Ressource description required"]
          
       },
       quantite:{
           type: Number,
           required : [true, "Ressource date required"]
          
       }
       
})

