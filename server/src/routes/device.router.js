const express = require('express');
const deviceRouter = express.Router();
import Device from './../models/Device.model';
deviceRouter.post("/create", (req, res, next) => {
  let newDevice = {
    os: req.body.os
  };
    Device.create(newDevice, function(err, result) {
    if(err){
        res.status(400).send({
          success: false,
          error: err.message
        });
    }
      res.status(201).send({
        success: true,
        data: result,
        message: "Device created successfully"
      });
  });
});

export default deviceRouter;