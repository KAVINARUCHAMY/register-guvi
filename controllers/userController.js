//const MergedModel = require('../models/user');
const User= require('../models/user');
const Home= require('../models/home');
const {generateTokenForUser } = require("../utils/auth");

exports.handleUserLogin = async function(req,res){
    const{ email,password} = req.body;
    try{
        if(!email) throw new Error("Email is required");
        if(!password || password.length<5) throw new Error("password");

        const user = await User.findOne({email});
        if(!user) throw new Error(`User with ${email} does not exist`); 

        if(user.password !== password) throw new Error('Invalid password');

        
        const token = await generateTokenForUser(user._id);
        
        return res
            .cookie("token",token)
            .render("home",{message:"Login success"});
    }
    catch(err){
        res.render("login",{
            err,
        });
    }
};


exports.handleUserSignup = async function(req,res){
    const{fullname,email,password} = req.body;
    

    try{
        if(!fullname) throw new Error("Fullname is required");
        if(!email) throw new Error("Email is required");
        if(!password || password.length<5) throw new Error("Password is required");

        await User.create({
            fullname,
            email,
            password
        });
        return res.render("home", {message:"Signup success"});
    }
    catch(err){
        res.render("signup",{
            err,
        });
    }
};


exports.handleHomePage = async function(req, res) {
    const { age, gender, dob, mobileno } = req.body;
    

    try {

        await Home.create({
            age,
            gender,
            dob,
            mobileno,
        });

        return res.render("home", { message: "Data updated successfully" });
    } catch (err) {
        res.render("home", {
            err,
        });
    }
};


