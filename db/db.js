const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../api/model/user')

const connect = async() => {
    console.log("Real Connect");
    await mongoose.connect(process.env.mongoDBURL)
}

const disconnect = async() => {
    console.log("Real Disconnect");
    await mongoose.connection.close();
}

const findUser = async (obj) => {
    await User.findOne(obj).exec()
};

const saveUser = async (newUser) => {
    console.log('Real User')
    return await newUser.save()
};

module.exports = { connect, findUser, saveUser, disconnect };