const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../api/model/user')

const connect = async() => {
    console.log("Real Connect");
    await mongoose.connect(process.env.mongoDBURL)
}


const findUser = async ({email}) => {
    console.log(email)
    return await User.find({email}).exec();
};

const saveUser = async (newUser) => {
    console.log('Real User')
    return await newUser.save()
};

const disconnect = async() => {
    console.log("Real Disconnect");
    await mongoose.connection.close();
}

module.exports = { connect, findUser, saveUser, disconnect };