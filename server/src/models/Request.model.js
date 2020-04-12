const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
    deviceId: {type: String, required: true},
    createdDate:{type:Number},
    licenseId: {type: String},
    status: {type: String, default: "PENDING"}
});

const License = mongoose.model("Request", requestSchema);
module.exports = License;