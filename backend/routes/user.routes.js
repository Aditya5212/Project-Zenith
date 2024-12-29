const {Router} = require("express");
const { createUserController,loginController,profileController,logoutController } = require("../controller/user.controller")
const {body} = require("express-validator")
const {authUser} = require("../middleware/auth.middleware.js")

const router = Router();

router.post("/register",
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    createUserController);

router.post("/login",
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    // Add login logic here
    loginController);

router.get("/logout",authUser,logoutController);

router.get("/profile",authUser,profileController);
    
module.exports = router