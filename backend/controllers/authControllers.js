const User = require('../Models/User');
const jwt = require('jsonwebton');
const bcrypt = require('bcrypt');

// Register fonction 
const register = async (req, res) =>{
    try{ 
        const{username, email, password, confirmPassword, number} = req.body;
        
        if (!username || !email || !password || !confirmPassword || !number ){
            return res.status(400).json({message: 'All fields are required.'});
        }

        if ( password !== confirmPassword){
            return res.status(400)({message:'Passwords do not match.'});
        }

    const existingUser = await User.findone({email});
    if (existingUser){
        return res.status(400).json({message: 'the email already existe'})
    }

    //creat a new user
    const user = new User({username, email, password, confirmpassword, number});
    console.log('User object befor saving ', user);


    //save user database
    try{
        await user.save();
        console.log('User saved successfully');
        res.status(201).json({message: 'User saved succesfully'});

    } catch(saveError){
      console.error('Erreur serveur:', saveError);
      res.status(500).json({message:'Server error, please try again later.'});
    }



    } catch (error){
        console.erreur('Error serveur:', error);
        res.status(500).json({message: 'Server error, please try again later.'});
    }
};



// Login fonction

const login = async(req, res) => {
    try{ 
       const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json({message:'all the fields are required.'})
        }
    
    const user = await User.findOne({email});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({message: 'Identifiants invalides'});
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    

    res.status(200).json({
        token, 
        user: {
           id : user._id,
           email: user.email,
           username: user.username 
        }
    });
        
    } catch(error){
       console.erreur('Error serveur:', error);
       res.status(500).json({message: 'server error, please try again later.'})

    }
};

module.exports = {register, login };