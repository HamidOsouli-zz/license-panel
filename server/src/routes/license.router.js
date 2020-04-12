const express = require('express');
const licenseRouter = express.Router();
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import moment from 'moment';
import License from './../models/License.model';
import multer from 'multer';
const upload = multer({ dest: 'tmp/csv/' });

licenseRouter.post("/upload-csv", upload.single('file'), async (req, res, next) => {
    const fileRows = [];
    new Promise((resolve, reject) => {
        csv.parseFile(req.file.path)
            .on("data", function (data) {
                fileRows.push(data);
            })
            .on("end", async () => {
                fs.unlinkSync(req.file.path);
                const keys = fileRows[0];
                const values = fileRows.slice(1);
                let promises = [];
                values.map((value) => {
                    let newLicense = {
                        createdDate: moment().format('X')
                    };
                    keys.map((key, index) => {
                        newLicense[key] = value[index];
                    });
                    promises.push(new Promise(((resolve1, reject1) => {
                        License.create(newLicense, function (err, result) {
                            if (err) {
                                reject(err)
                            } else if (result) {
                                resolve(result)
                            }
                        })
                    })));
                });
                await Promise.all(promises);
            });
        }).then(() => {
            res.status(200).json({result: "success"})
    }).catch((e) => {
        res.status(500).json({result: e})
    })
    }
);


export default licenseRouter;