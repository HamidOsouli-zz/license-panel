const jwt = require('jsonwebtoken');
import User from './models/User.model';
import License from './models/License.model';
import moment from 'moment';
export const isAdmin = async (req, res, next) => {
    try {
        if (req.header('Authorization')) {
            const authorizationHeader = removeBearer(req.header('Authorization'));
            const data = verifyJwt(authorizationHeader)
            res.locals.user = data;
            if (res.locals.user.role === "admin") {
                next()
            } else {
                throw new Error("unAuthorize")
            }
        } else {
            throw new Error("unAuthorize")
        }
    } catch (e) {
        res.status(403).json({ "message": e.message })
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
            res.status(401).json({ "message": "Bearer Authorization is required" })
        } else {
            const authorizationHeader = removeBearer(req.header('Authorization'));
            const data = verifyJwt(authorizationHeader);
            res.locals.user = data;
            if (res.locals.user) {
                next()
            } else {
                throw new Error("unAuthorize")
            }
        }
    } catch (e) {
        res.status(401).json({ "message": e.message })
    }
}
export const canCreate = async (req, res, next) => {
    try {
        if (res.locals.user.role === 'admin') {
            next()
        } else {
            License.find({ "expirationDate": { $gte: new Date().getTime() }, "userId": res.locals.user.id }, (err, result) => {
                if (err) {
                    res.status(400).json({ "message": "There is a problem with creating license. Please try later." })
                } else if (result.length >= 6) {
                    res.status(400).json({ "message": "You used all your 6 licenses in this year." })
                } else {
                    License.find({ "expirationDate": { $gte: new Date().getTime() }, "userId": res.locals.user.id, "os": req.body.os }, (err, result) => {
                        if (result.length >= 2) {
                            res.status(400).json({ "message": "You used all your 2 licenses in this year for " + req.body.os + " operating system." })
                        } else {
                            next()
                        }
                    })
                }
            });
        }
    } catch (e) {
        res.status(403).json({ "message": e.message })
    }
}