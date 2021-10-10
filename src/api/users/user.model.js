const { Schema, model } = require('mongoose');
const { ROLES } = require('../../shared/constants.shared');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: ROLES.USER,
    },
});

module.exports = model('users', userSchema);