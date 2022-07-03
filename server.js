const http = require('http');
const app = require('./app/app');
require('dotenv').config();

http.createServer(app).listen(process.env.port, () => {
    console.log(`Server is up and running on port: ${process.env.port}`);
});