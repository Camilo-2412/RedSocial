const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async(req,res) =>{
    if(!req.body.name || !req.body.email ||!req.body.pass) return res.status(400).send("Incomplete Data");

    let existingEmail = await User.findOne({email: req.body.email});
    if(existingEmail) return res.status(400).send("Email already register");

    let hash = await bcrypt.hash(req.body.pass, 10);

    let user = new User({
        name: req.body.name,
        email:req.body.email,
        pass: hash,
        dbStatus: true,
    });

    let result = await user.save();
    if(!result) return res.status(400).send("Failed to register user");

    try {
        let jwt = user.generateJWT();
        return res.status(400).send({jwt});
    } catch (e) {
        return res.status(400).send("Failed to register user")
    }
};

module.exports = {registerUser };
