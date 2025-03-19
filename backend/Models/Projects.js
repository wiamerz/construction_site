import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    Name:{
     type: String,
     required : [true, "project name required"]
    },
    Description:{
        type: String,
        required : [true, "project description required"]
       
    },
    StarteDate:{
        type: Date,
        required : [true, "Start date required"]
       
    },
    EndDate:{
        type: Date,
        required : [true, "End date required"]
       
    },
    Budget:{
        type: Number,
        required : [true, "project budget required"]
       
    }
});

module.exports = mongoose.model('User', ProjectSchema);