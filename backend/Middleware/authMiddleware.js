const jwt = require('jsonwebtoken');
const User = require("../Models/userModel.js");
const expressAsyncHandler = require("express-async-handler");

const protect = expressAsyncHandler(async(req, res, next) => {
    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // console.log("token", token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("decoded", decoded);
            req.user = await User.findById(decoded.id).select("-password");
            // console.log(req.user);
            
            next();
        }
        catch(error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if(!token) {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
});

module.exports = {protect};