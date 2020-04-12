const mongoose = require('mongoose');
const licenseSchema = new mongoose.Schema({
    license_id: {type: String, required: true},
    deviceId: {type: String},
    createdDate:{type:Number},
    expirationDate:{type:Number},
    amount: {type: Number}
});

const License = mongoose.model("License", licenseSchema);
module.exports = License;