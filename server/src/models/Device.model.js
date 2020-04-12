const mongoose = require('mongoose');
const deviceSchema = new mongoose.Schema({
    os: {type: String, required: true}
});

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;