const express = require('express');
const routes = express.Router();

routes.post('/signup', (req, res) => {
    res.status(200).json({
        message: '/signup - POST'
    });
});

routes.post('/login', (req, res) => {
    res.status(200).json({
        message: '/login - POST'
    });
});

routes.get('/profile', (req, res) => {
    res.status(200).json({
        message: '/profile -GET'
    });
});

module.exports = routes;