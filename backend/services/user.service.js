const User = require("../models/user.model");

exports.createUser = async ({
    email, password
}) =>{
    if(!email || !password){
        throw new Error("Email and password are required");
    }
    const existingUser  = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already in use");
    }

    const hashedPassword = await User.hashPassword(password);
    const user = await User.create({
        email,
        password:hashedPassword
    });
    return user;
}
