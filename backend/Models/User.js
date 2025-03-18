const mongoose = required('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required : [true, 'the name is required'],
        trim:true
    },
    email: {
        type: String,
        required: [true, 'the emailis required'],
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "the email format is invalide"]

    },
    password: {
        type: string,
        
    }
})
