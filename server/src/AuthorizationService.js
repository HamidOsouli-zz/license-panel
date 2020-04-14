const jwt = require('jsonwebtoken');
import User from './models/User.model';
import License from './models/License.model';
import moment from 'moment';
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
export const canCreate = async (req, res, next) => {
    try {
       License.find({"createdDate":{ $gte:moment().subtract(1, "year").format("X"), $lt:moment().format("X") }, "username": res.locals.user.username}, (err, result) => {
           if(err){
               throw new Error("Can not create")
           } else if (result.length <= 6 && (result.filter(i => i.os === "Android").length <= 2) && (result.filter(i => i.os === "IOS").length <= 2) && (result.filter(i => i.os === "Windows").length <= 2)){
                next();
           } else {
               throw new Error("You cant create these numbers of license")
           }
       });
    } catch (e) {
        res.status(403).json({"message": e.message})
    }
}