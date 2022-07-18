const mongoose = require('mongoose');
const User = require('../api/model/user');
const { connect, findUser, saveUser, disconnect } = require('./db')

jest.mock('./db');

beforeEach(async () => {
    await connect();
})

describe("Db Tests", () => {
    test("Creating a new user and making sure info is there.", async() => {
        const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            firstName: "Bob",
            lastName: "Fuller",
            address: "5544 New Road",
            city: "Sodaopulous",
            state: "Popson",
            zip: "22334",
            email: "fullerbob@pop.com",
            password: "soda",
        })
        // await connect();
        const user = await saveUser(newUser);
        expect(user.firstName).toEqual("Bob")
        expect(user.state).toEqual("Popson")
        expect(user.password).toEqual("soda")
        expect(user.email).not.toEqual("bobberton@upsie.com")
        // await disconnect();
    });

    test("Finding an existing user", () => {
        findUser({firstName: "Greg"})
        .then(result => {
            expect(result.firstName).toEqual("Greg")
            expect(result.zip).toEqual('00889')
            expect(result.password).toEqual("hardboiled")
            expect(result.lastName).not.toEqual("McGreggor")
        })
    })
})

afterEach(async () => {
    await disconnect();
})