const jwt = require("jsonwebtoken");
//const user = require("../models/user");
const User = require("../models/user");

async function generateTokenForUser(id){
    const user = await User.findById(id);
    const payload = {
        _id : user.id,
        email: user.email,
    };
    const token = jwt.sign(payload, "kavin");
    return token; 
    
}

module.exports={
    generateTokenForUser,
};