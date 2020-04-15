const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {type: String, default: 'user'},
}, {
    toJSON: {
        transform: function (doc, ret) {
            if (ret._id) {
                ret.id = ret._id;
                delete ret._id;
            }
            return ret;
        },
    },
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
