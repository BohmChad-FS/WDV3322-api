const connect = async() => {
    console.log("Mock Connect");
}

const disconnect = async() => {
    console.log("Mock Disconnect");
}

const findUser = async (obj) => {
    // await User.findOne(obj).exec()
    console.log('Mocked Finder')
    return Promise.resolve({
        firstName: "Greg",
        lastName: "Lenner",
        address: "2121 Leftovers Lane",
        city: "Foodcourtia",
        state: "Buffeton",
        zip: "00889",
        email: "gregtheegg@plum.net",
        password: "hardboiled",
    });
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