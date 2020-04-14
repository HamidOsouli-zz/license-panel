const jwt = require('jsonwebtoken');
import User from './models/User.model';
const ObjectId = require('mongoose').Types.ObjectId

export const isAdmin = async (req, res, next) => {
    try {
        if (req.header('Authorization')) {
            const authorizationHeader = removeBearer(req.header('Authorization'));
            const data = verifyJwt(authorizationHeader)
            res.locals.user = await User.findOne({"username": data.username});
            if (res.locals.user.role === "admin") {
                next()
            } else {
                throw new Error("unAuthorize")
            }
        } else {
            throw new Error("unAuthorize")
        }
    } catch (e) {
        res.status(403).json({"message": e.message})
    }
};

export const verifyJwt = (jwtToken) => {
    try {
        return jwt.verify(jwtToken, "secret");
    } catch (e) {
    }
};

export const removeBearer = (jwtToken) => {
    return jwtToken.split(' ')[1]
};
export const validateJwt = async (req, res, next) => {

    try {
        if (!req.header('Authorization')) {
            res.status(401).json({"message": "Bearer Authorization is required"})
        } else {
            const authorizationHeader = removeBearer(req.header('Authorization'));
            const data = verifyJwt(authorizationHeader);
            res.locals.user = await User.findOne({"username": data.username});
            console.log(data, res.locals.user);
            if (res.locals.user) {
                next()
            } else {
                throw new Error("unAuthorize")
            }
        }
    } catch (e) {
        res.status(401).json({"message": e.message})
    }
}