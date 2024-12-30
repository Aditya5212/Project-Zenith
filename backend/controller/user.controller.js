const User = require("../models/user.model.js");
const {createUser, getAllUsers} = require("../services/user.service.js");
const {validationResult} = require("express-validator");
const redisClient = require("../services/redis.service.js");

exports.createUserController = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array()});
    }
    try{
        const user = await createUser(req.body);
        const token = await user.generateJWT();
        res.cookie("token", token);
        delete user._doc.password;
        res.status(201).send({user: user, token: token});
    }catch(error){
        if (error.message === "Email already in use") {
            return res.status(409).json({
                message: "Conflict: Email already in use",
                error: error.message
            });
        }
        res.status(400).json(
            {
                message: "Error creating user",
                error: error.message
            }
        );
    }
}

exports.loginController = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array()});
    }

    try{
        const user = await User.findOne({email: req.body.email}).select("+password");
        if(!user){
            return res.status(401).json({error: "Invalid Credentials"});
        }
        const isMatch = await user.isValidPassword(req.body.password);
        if(!isMatch){
            return res.status(401).json({error: "Incorrect Password"});
        }
        const token = await user.generateJWT();
        res.cookie("token", token);
        delete user._doc.password;
        res.send({user: user, token: token});
    }catch(error){
        res.status(400).json(
            {
                message: "Error logging in",
                error: error.message
            }
        );
    }
}

exports.profileController = async (req, res) => {
    console.log(req.user);
    res.status(200).json({
        user: req.user
    })
}

exports.logoutController = async (req, res) => {
    // res.clearCookie("token");
    // res.status(200).json({message: "Logged out successfully"});
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        redisClient.set(token,"logout",'EX',60*60*24)
        res.status(200).json({
            message: "Logged out successfully"
        })

    }catch(error){
        res.status(400).json(
            {
                message: "Error logging out",
                error: error.message
            }
        );
    }
}

exports.getAllUsersController = async (req, res) => {
    try{
        const loggedInUser = await User.findOne({email: req.user.email});
        const userId = loggedInUser._id;
        const allUsers = await getAllUsers({userId});
        return res.status(200).json(allUsers);
    }catch(error){
        res.status(400).json(
            {
                message: "Error fetching users",
                error: error.message
            }
        );
    }
}