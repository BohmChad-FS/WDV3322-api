const mongoose = require('mongoose');
const { Testcafe, Jest } = require('styled-icons/simple-icons');
const User = require('../api/model/user');
const { saveUser, connect, disconnect } = require('./db')

jest.mock('./db');

describe("Db Tests", () => {
    test("As a user I want to save a user to MongoDB", async() => {
        const newUser = new User({
            _id: mongoose.Types.ObjectId,
            firstName: "Bob",
            lastName: "Fuller",
            address: "5544 New Road",
            city: "Sodaopulous",
            state: "Popson",
            zip: "22334",
            email: "fullerbob@pop.com",
            password: "soda",
        })
        await connect();
        const user = await saveUser(newUser);
        expect(user.firstName).toEqual("Bob")
        expect(user.state).toEqual("Popson")
        expect(user.password).toEqual("soda")
        await disconnect();
    });
})