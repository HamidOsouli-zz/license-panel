const express = require('express');
const licenseRouter = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
import moment from 'moment';
import License from './../models/License.model';
import { validateJwt, isAdmin, canCreate } from './../AuthorizationService';

licenseRouter.post("/create", [validateJwt, canCreate], (req, res, next) => {
    let newLicense = {
        os: req.body.os,
        license_id: req.body.license_id,
        createdDate: moment().format('X') * 1000,
        expirationDate: moment().add(1, 'year').format('X') * 1000,
        userId: res.locals.user.id,
        userName: res.locals.user.name
    }
    License.create(newLicense, function (err, result) {
        if (err) {
            res.status(400).send({
                success: false,
                error: err.message
            });
        }
        res.status(201).send({
            success: true,
            data: result,
            message: "License created successfully"
        });
    });
});

licenseRouter.post("/update", [validateJwt, isAdmin], (req, res, next) => {
    const { action, id } = req.body;
    try {
        if (action === "accept") {
            License.updateOne({ "_id": id }, { status: "ACCEPTED" }, (err, result) => {
                if (err) {
                    res.status(500).send({
                        success: false,
                        error: err.message
                    });
                } else
                    res.status(200).send({
                        success: true,
                        data: result
                    });
            });
        } else if (action === "reject") {
            License.updateOne({ "_id": id }, { status: "REJECTED" }, (err, result) => {
                if (err) {
                    res.status(500).send({
                        success: false,
                        error: err.message
                    });
                } else
                    res.status(200).send({
                        success: true,
                        data: result
                    });
            });
        } else {
            res.status(500).send({
                success: false,
                error: "Action could be reject or accept"
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            error: err.message
        });
    }
});

licenseRouter.get("/all", [validateJwt], (req, res, next) => {
    if (res.locals.user.role === 'admin') {
        License.find({}, function (err, result) {
            if (err) {
                res.status(404).send({
                    success: false,
                    error: err.message
                });
            }
            res.status(200).send({
                success: true,
                data: result
            });
        });
    } else {
        License.find({ userId: res.locals.user.id }, function (err, result) {
            if (err) {
                res.status(404).send({
                    success: false,
                    error: err.message
                });
            }
            res.status(200).send({
                success: true,
                data: result
            });
        });
    }
});


export default licenseRouter;