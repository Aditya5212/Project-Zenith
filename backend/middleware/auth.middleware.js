const jwt = require("jsonwebtoken");
const redisClient = require("../services/redis.service");
exports.authUser = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.headers.Authorization.split(" ")[1]; //replace("Bearer ", "")
        if (!token){
            return res.status(401).json({ error: "No token, authorization denied" });
        } 

        const isBlackListed = await redisClient.get(token);
        if (isBlackListed){
            res.cookie("token", "");
            return res.status(401).json({ error: "Token is blacklisted" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({ error: "Token is not valid" });
    }
}