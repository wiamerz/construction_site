import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
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
          
       }
})

