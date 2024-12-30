const {Router} = require("express");
const {body} = require("express-validator")
const {createProjectController ,getAllProjectsController ,addUserToProjectController, getProjectByIDController} = require("../controller/project.controller.js");
const {authUser} = require("../middleware/auth.middleware.js");



const router = Router();

router.post("/create",
    authUser,
    body("name").isString().withMessage("Name is required"),
    createProjectController
);

router.get("/all",
    authUser,
    getAllProjectsController
)

router.put("/add-user",
    authUser,
    body("userId").isMongoId().withMessage("Invalid user ID"),
    body("projectId").isMongoId().withMessage("Invalid project ID"),
    addUserToProjectController
)

router.get("/get-project/:projectId",
    authUser,
    getProjectByIDController
)

module.exports = router

