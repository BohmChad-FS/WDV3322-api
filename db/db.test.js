const mongoose = require('mongoose');
const User = require('../api/model/user');
const { connect, findUser, saveUser, disconnect } = require('./db')

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
        expect(user.email).not.toEqual("bobberton@upsie.com")
        await disconnect();
    });

    test("", () => {
        
    })
})