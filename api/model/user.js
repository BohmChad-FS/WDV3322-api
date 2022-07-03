const mongoose = require('mongoose');
const { Address } = require('styled-icons/entypo');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String
    },
    lastName: {
        type: STring
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: Sting
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);