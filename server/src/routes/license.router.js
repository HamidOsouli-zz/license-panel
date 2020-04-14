const express = require('express');
const licenseRouter = express.Router();
import moment from 'moment';
import License from './../models/License.model';
import { validateJwt, isAdmin } from './../AuthorizationService';
licenseRouter.post("/create", validateJwt, (req, res, next) => {
    let newLicense = {
        os: req.body.os,
        license_id: req.body.license_id,
        createdDate: moment().format('X'),
        expirationDate:  moment().add(1, 'year').format('X'),
        userId: res.locals.user.id
    };
    License.create(newLicense, function(err, result) {
        if(err){
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

licenseRouter.get("/all", [validateJwt, isAdmin],  (req, res, next) => {
    License.find({}, function(err, result) {
        if(err){
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
});


export default licenseRouter;