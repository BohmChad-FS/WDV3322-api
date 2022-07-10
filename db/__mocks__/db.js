const connect = async() => {
    console.log("Mock Connect");
}

const disconnect = async() => {
    console.log("Mock Disconnect");
}

const findUser = async (obj) => {
    await User.findOne(obj).exec()
};

const saveUser = async (newUser) => {
    console.log('Mocked User')
    return Promise.resolve({
        firstName: "Bob",
        lastName: "Fuller",
        address: "5544 New Road",
        city: "Sodaopulous",
        state: "Popson",
        zip: "22334",
        email: "fullerbob@pop.com",
        password: "soda",
    });
};

module.exports = { connect, findUser, saveUser, disconnect };