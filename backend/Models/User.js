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
        type: String,
        required: [true, 'the password is required'],
        minlength: [6, 'the password should had 6 caracteres minimum']
      },
      number: {
        type: String,
        required: [true, 'the phone number is required']
      }
    }, { timestamps: true });

 // hash password before saving
userSchema.pre('save', async function(next){
    if (this.isModified('password...')){
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Password hashed successfully ');
}
next();
})

module.exports = mongoose.model('User', userSchema);
