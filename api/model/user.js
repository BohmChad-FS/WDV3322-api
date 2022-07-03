const mongoose = require('mongoose');
const { Address } = require('styled-icons/entypo');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String
    },
    lastName
    Addresscity
    this.state.zip
    email
    password
});

module.exports = mongoose.model('User', userSchema);