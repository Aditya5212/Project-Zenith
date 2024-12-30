const Project = require("../models/project.model.js");

exports.createProject = async ({name, userId}) =>{
    if(!name){
        throw new Error("Name is required");
    }
    if(!userId){
        throw new Error("User is required");
    }
    let project;
    try {
        project = await Project.create({
            name,
            users: [userId]
        });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error code in MongoDB
            throw new Error("Project name already exists");
        }
        throw error; // Re-throw other errors
    }
    return project;
}

exports.getAllProjectsByUserID = async ({userId})=>{
    if(!userId){
        throw new Error("User is required");
    }
    const projects = await Project.find({users: userId});
    return projects;
}

// exports.addUserToProject = async ({userId,projectId})=>{
//     if(!userId){
//         throw new Error("User is required");
//     }
//     if(!projectId){
//         throw new Error("Project is required");
//     }
//     const updatedProject = await Project.findOneAndUpdate({
//         _id: projectId
//     }, 
//     { $addToSet: { users: userId } }, {
//         new: true
//     })

//     return updatedProject
//     // project.users.push(userId);
//     // await project.save();
//     // return project;
// }

exports.addUserToProject = async ({ userId, projectId }) => {
    if (!userId) {
        throw new Error("User is required");
    }
    if (!projectId) {
        throw new Error("Project is required");
    }
    // Use atomic operation to add user to the users array
    const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { $addToSet: { users: userId } }, // Atomic operation to add user to the users array
        { new: true } // Return the updated document
    );

    return updatedProject;
};

exports.getProjectById = async ({ projectId }) => {
    console.log(projectId);
    if (!projectId) {
        throw new Error("Project ID is required");
    }
    const project = await Project.findById({_id:projectId})
    .populate("users");
    if (!project) {
        throw new Error("Project not found");
    }
    return project;
}
