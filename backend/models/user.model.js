const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
        minLength: [6,"Email must be at least 6 characters long"],
        maxLength: [50,"Email must not exceed 50 characters"]
    },
    password: {
        type: String,
        required: true,
        select:false
    }
})

userSchema.statics.hashPassword = async function(password){
    return bcrypt.hash(password,10);
}

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function () {
    return jwt.sign(
        { email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

module.exports = mongoose.model("User",userSchema);