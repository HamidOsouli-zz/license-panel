const mongoose = require('mongoose');
const licenseSchema = new mongoose.Schema({
    license_id: {type: String, required: true},
    createdDate:{type:Number},
    expirationDate:{type:Number},
    os: {type: String, required: true},
    userId: {type: String, required: true}
});

const License = mongoose.model("License", licenseSchema);
module.exports = License;