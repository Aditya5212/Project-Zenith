const Project = require("../models/project.model.js");
const projectService = require("../services/project.service.js");
const {validationResult} = require("express-validator");
const User = require("../models/user.model.js")

exports.createProjectController = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array()});
    }
    try{
        const {name} = req.body;
        const loggedInUser = await User.findOne({email:req.user.email});
        const userId = loggedInUser._id;
        const newProject =  await projectService.createProject({name,userId});
        res.status(201).json(newProject);
    }catch(error){
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
}


exports.getAllProjectsController = async(req, res) => {
    try{
        const loggedInUser = await User.findOne({email:req.user.email});
        const userId = loggedInUser._id;
        const allProjects = await projectService.getAllProjectsByUserID({userId:userId});
        return res.status(200).json({
            userId:userId,
            email: req.user.email,
            projects:allProjects
        });
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

// #################################
// It has become too complicated please try to simplify it before sleeping
exports.addUserToProjectController = async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array()});
    }
    try{
        const {userId,projectId} = req.body;
        const loggedInUser = await User.findOne({email:req.user.email});
        const loggedInUserId = loggedInUser._id;
        const project = await Project.findById(projectId);
        if(!project.users.includes(loggedInUserId)){
            return res.status(401).json({message:"Unauthorized"});
        }
        if(project.users.includes(userId)){
            return res.status(400).json({message:"User is already in the project"});
        }
        if(!project){
            return res.status(404).json({message:"Project not found"});
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const updatedProject = await projectService.addUserToProject({userId,projectId});
        res.status(200).json(updatedProject);
        
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

exports.getProjectByIDController = async(req, res) => {
    try{
        const { projectId } = req.params;
        const project = await projectService.getProjectById({projectId});
        res.status(200).json(project);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}