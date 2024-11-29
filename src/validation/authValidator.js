const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnAuthorizedError = require('../utils/unauthorizedError');

async function isLoggedIn(req, res, next){
    const token = req.cookies["authToken"];
    
    if(!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not Authenticated",
            message: "No Auth Token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(!decoded) {
            throw new UnAuthorizedError();
        }
        // If reached here, then user is authenticated allow them to access the api

        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }
        next();
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            res.cookie("authToken", "", {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            return res.status(200).json({
                success: true,
                message: "Log out successfull",
                error: {},
                data: {}
            });
        }
        return res.status(401).json({
            success: false,
            data: {},
            error: error,
            message: "Invalid Token Provided"
        });
    }
}

function isAdmin(req, res, next) {
    const loggedInUser = req.user;
    if(loggedInUser.role === "ADMIN") {
        next();
    } else {
        return res.status(401).json({
            success: false,
            data: {},
            message: "You are not authorized for this action",
            error: {
                statusCode: 401,
                reason: "Unauthorized user for this action"
            }
        })
    }
    
}

module.exports = {
    isLoggedIn,
    isAdmin
}